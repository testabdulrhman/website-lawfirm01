import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';
import { Link } from 'wouter';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import { FileText, Upload, Calendar, Building2, AlertTriangle, CheckCircle2, Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { localePath } from "@/lib/localePath";
import { parseAmount, formatAmountPreview } from "@/lib/amount";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS, LANG_ORDER, fmtDate, trClaimType, trDocCategory, trProcedure } from "@/data/creditorI18n";
import { CLAIMS_T, DECLARATION_AR, trCapacity, trCreditorType, trIdType, trSecurityType, type ClaimsStrings } from "@/data/claimsI18n";
import {
  trackClaimStart,
  trackClaimSubmit,
  trackClaimSuccess,
  trackFileUpload,
} from "@/lib/analytics";

// Types
interface CaseData {
  id: number;
  debtor_name: string;
  debtor_name_en?: string;
  debtor_logo?: string;
  debtor_logo_url?: string;
  procedure_type: string;
  case_number?: string;
  commercial_reg?: string;
  court_name?: string;
  claims_deadline?: string;
  opening_date?: string;
  status: string;
}

interface CaseProcedure {
  case_id: number;
  due_date: string;
  procedure_key: string;
  procedure_name: string;
}

// Helpers
// مسودة النموذج في جهاز الدائن: إن انقطع الاتصال أو أُغلقت الصفحة قبل
// الإرسال وجد بياناته حين يعود. وتُمحى حين تُحفظ المطالبة في صندوق الاستلام.
// أنواع الدائن كما في النظام الداخلي — قائمةٌ واحدة في الموقع والنظام
const CREDITOR_TYPES = ['فرد', 'شركة', 'مؤسسة', 'جهة حكومية', 'بنك'];

// صفة من يقدّم المطالبة عن صاحب الحق. والمنشأة لا تقدّم بنفسها، فلها دائماً مقدّم
const PERSON_CAPACITIES = ['وكيل', 'محامٍ'];
const ORG_CAPACITIES = ['ممثل نظامي', 'موظف مفوَّض', 'وكيل', 'محامٍ'];
// سند الصفة الذي يُطلب رقمه، وهل هو إلزامي (العنوان بلغة الدائن في claimsI18n)
const CAPACITY_DOC: Record<string, { required: boolean }> = {
  'وكيل': { required: true },
  'محامٍ': { required: true },
  'موظف مفوَّض': { required: false },
};
/** الأرقام وحدها، بالأرقام اللاتينية — لمقارنة رقم الدائن برقم مقدّم الطلب */
const digitsOf = (v: string) =>
  v.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/\D/g, '');

const DRAFT_KEY = (caseId: number | string) => `claim_draft_v1:${caseId}`;
// القضية المفتوحة وخطوتها: تغيير اللغة يغيّر الرابط فتُبنى الصفحة من جديد،
// فيعود الدائن إلى حيث كان لا إلى قائمة القضايا
const OPEN_KEY = 'claim_open_v1';
function clearDraft(caseId: number | string) {
  try { localStorage.removeItem(DRAFT_KEY(caseId)); } catch { /* ignore */ }
}

/** المبلغ كما سيُحفظ — يراه الدائن تحت الخانة قبل أن يرسل */
function AmountPreview({ raw, t }: { raw: string; t: ClaimsStrings }) {
  if (!raw.trim()) return null;
  const n = parseAmount(raw);
  return n === null ? (
    <p className="mt-1.5 text-xs text-red-600">{t.amountUnclear}</p>
  ) : (
    <p className="mt-1.5 text-xs text-[var(--color-navy)]/60">
      {t.willRecord} <bdi dir="ltr" className="font-semibold text-[var(--color-navy)]">{formatAmountPreview(n)}</bdi>
    </p>
  );
}

function daysUntilDeadline(deadline?: string): number | null {
  if (!deadline) return null;
  try {
    const d = new Date(deadline);
    if (isNaN(d.getTime())) return null;
    d.setHours(23, 59, 59, 999);
    return Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  } catch { return null; }
}



export default function Claims() {
  const { lang, setLang, isRTL } = useLanguage();
  const lp = (p: string) => localePath(p, lang);
  // ما يظهر بلغة الدائن، وما يُحفظ يبقى بقيمه العربية
  const t = CLAIMS_T[lang];
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitLabel, setSubmitLabel] = useState('');
  const [success, setSuccess] = useState(false);
  // المطالبة المحفوظة، وما لم يصل من مرفقاتها (بأسماء تصنيفاتها)
  const [savedId, setSavedId] = useState<number | null>(null);
  const [failedDocs, setFailedDocs] = useState<string[]>([]);
  const [retrying, setRetrying] = useState(false);
  // رقم الاستلام: تُحفظ المطالبة خاماً قبل تسجيلها، فإن تعذّر التسجيل لم تضع
  const [intakeId, setIntakeId] = useState<string | null>(null);
  const [pendingIntake, setPendingIntake] = useState(false);
  const [claimRef, setClaimRef] = useState('');
  const [caseSeq, setCaseSeq] = useState<number | null>(null);

  // Form state
  const [creditorType, setCreditorType] = useState('');
  const [creditorName, setCreditorName] = useState('');
  const [idType, setIdType] = useState('هوية وطنية');
  const [idNumber, setIdNumber] = useState('');
  // مقدّم الطلب إن لم يكن صاحب الحق: اسمه في representativeName كما كان
  const [representativeName, setRepresentativeName] = useState('');
  const [onBehalf, setOnBehalf] = useState<'self' | 'other'>('self');
  const [applicantCapacity, setApplicantCapacity] = useState('');
  const [applicantIdNumber, setApplicantIdNumber] = useState('');
  const [capacityDocument, setCapacityDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [additionalNumber, setAdditionalNumber] = useState('');

  // Step 2 - Claim details
  const [claimType, setClaimType] = useState('تجاري');
  const [claimAmount, setClaimAmount] = useState('');
  const [isSecured, setIsSecured] = useState('no');
  const [securityType, setSecurityType] = useState('');
  const [securityValue, setSecurityValue] = useState('');
  const [debtOriginDate, setDebtOriginDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueDocument, setDueDocument] = useState('');
  const [claimReason, setClaimReason] = useState('');

  // Step 3 - Documents & Signature
  const [files, setFiles] = useState<Record<string, { file: File; label: string }>>({});
  const [declaration, setDeclaration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [signatureEmpty, setSignatureEmpty] = useState(true);

  const isPerson = creditorType === 'فرد';
  const hasApplicant = !isPerson || onBehalf === 'other';
  const capacities = isPerson ? PERSON_CAPACITIES : ORG_CAPACITIES;
  // نوع الهوية للمنشأة يُستنتج من نوعها، فلا تُسجَّل جهةٌ «هوية وطنية»
  const idTypeOut = isPerson ? idType : creditorType === 'جهة حكومية' ? 'رقم منشأة' : 'سجل تجاري';

  useEffect(() => {
    if (loading) return; // لا يُمحى قبل أن تُقرأ بعد تحميل القضايا
    try {
      if (selectedCase && !success) sessionStorage.setItem(OPEN_KEY, JSON.stringify({ caseId: selectedCase.id, step: currentStep }));
      else sessionStorage.removeItem(OPEN_KEY);
    } catch { /* ignore */ }
  }, [loading, selectedCase, currentStep, success]);

  // Load cases
  useEffect(() => {
    loadCases();
  }, []);

  // المسودة: الحقول النصية وحدها (المرفقات والتوقيع لا تُحفظ في المتصفح)
  const draft = {
    creditorType, creditorName, idType, idNumber, representativeName, phone, email,
    onBehalf, applicantCapacity, applicantIdNumber, capacityDocument,
    buildingNumber, streetName, district, city, postalCode, additionalNumber,
    claimType, claimAmount, isSecured, securityType, securityValue,
    debtOriginDate, dueDate, dueDocument, claimReason,
  };
  const draftJson = JSON.stringify(draft);
  useEffect(() => {
    if (!selectedCase || success || submitting) return;
    const t = setTimeout(() => {
      try {
        const empty = !creditorName.trim() && !idNumber.trim() && !claimAmount.trim() && !claimReason.trim();
        if (empty) localStorage.removeItem(DRAFT_KEY(selectedCase.id));
        else localStorage.setItem(DRAFT_KEY(selectedCase.id), draftJson);
      } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftJson, selectedCase, success, submitting]);

  function restoreDraft(caseId: number | string, quiet = false) {
    let d: Partial<typeof draft> | null = null;
    try { d = JSON.parse(localStorage.getItem(DRAFT_KEY(caseId)) || 'null'); } catch { d = null; }
    if (!d) return;
    const set = <T,>(v: T | undefined, f: (x: T) => void) => { if (v !== undefined && v !== null) f(v); };
    // مسوّدةٌ قديمة فيها «شركة-مؤسسة» لم يعد خياراً: يختار الدائن من جديد
    set(d.creditorType, (v) => setCreditorType(CREDITOR_TYPES.includes(v) ? v : '')); set(d.creditorName, setCreditorName); set(d.idType, setIdType);
    set(d.idNumber, setIdNumber); set(d.representativeName, setRepresentativeName); set(d.phone, setPhone);
    set(d.email, setEmail); set(d.buildingNumber, setBuildingNumber); set(d.streetName, setStreetName);
    set(d.district, setDistrict); set(d.city, setCity); set(d.postalCode, setPostalCode);
    set(d.additionalNumber, setAdditionalNumber); set(d.claimType, setClaimType); set(d.claimAmount, setClaimAmount);
    set(d.isSecured, setIsSecured); set(d.securityType, setSecurityType); set(d.securityValue, setSecurityValue);
    set(d.debtOriginDate, setDebtOriginDate); set(d.dueDate, setDueDate); set(d.dueDocument, setDueDocument);
    set(d.claimReason, setClaimReason);
    set(d.onBehalf, setOnBehalf); set(d.applicantCapacity, setApplicantCapacity);
    set(d.applicantIdNumber, setApplicantIdNumber); set(d.capacityDocument, setCapacityDocument);
    if (!quiet) toast.info(t.draftRestored, { duration: 7000 });
  }

  async function loadCases() {
    setLoading(true);
    try {
      const [casesRes, procsRes] = await Promise.all([
        supabase.from('cases').select('*').eq('status', 'جاري').order('opening_date', { ascending: false }),
        supabase.from('case_procedures').select('case_id, due_date, procedure_key, procedure_name')
      ]);

      if (casesRes.error) throw casesRes.error;

      const data = casesRes.data || [];
      const procs: CaseProcedure[] = procsRes.data || [];

      data.forEach((c: CaseData) => {
        if (!c.claims_deadline) {
          const matchingProc = procs.find(p =>
            p.case_id === c.id &&
            (p.procedure_key === 'claims_deadline_end' ||
              (p.procedure_name && p.procedure_name.includes('استقبال المطالبات')))
          );
          if (matchingProc?.due_date) {
            c.claims_deadline = matchingProc.due_date;
          }
        }
      });

      data.sort((a: CaseData, b: CaseData) => {
        if (!a.opening_date && !b.opening_date) return 0;
        if (!a.opening_date) return 1;
        if (!b.opening_date) return -1;
        return new Date(b.opening_date).getTime() - new Date(a.opening_date).getTime();
      });

      setCases(data);
      // عاد بعد تغيير اللغة: القضية والخطوة كما كانتا، والحقول من المسودة
      try {
        const open = JSON.parse(sessionStorage.getItem(OPEN_KEY) || 'null') as { caseId: number; step: number } | null;
        const c = open && data.find((x: CaseData) => x.id === open.caseId);
        if (c) {
          setSelectedCase(c);
          restoreDraft(c.id, true);
          setCurrentStep(Math.min(Math.max(open!.step, 1), 3));
        }
      } catch { /* ignore */ }
    } catch (e) {
      console.error('Load cases error:', e);
      toast.error(t.errLoadCases);
    } finally {
      setLoading(false);
    }
  }

  // البوابة تستقبل المطالبات حتى بعد انقضاء المدة النظامية؛ التصنيف (داخل/خارج المدة) يتم في النظام الإداري
  function handleSelectCase(c: CaseData) {
    setSelectedCase(c);
    restoreDraft(c.id);
    trackClaimStart(c.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToSelection() {
    setSelectedCase(null);
    setCurrentStep(1);
    setSuccess(false);
    setSavedId(null);
    setFailedDocs([]);
    setIntakeId(null);
    setPendingIntake(false);
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setCreditorType('');
    setCreditorName('');
    setIdType('هوية وطنية');
    setIdNumber('');
    setRepresentativeName('');
    setOnBehalf('self');
    setApplicantCapacity('');
    setApplicantIdNumber('');
    setCapacityDocument('');
    setPhone('');
    setEmail('');
    setBuildingNumber('');
    setStreetName('');
    setDistrict('');
    setCity('');
    setPostalCode('');
    setAdditionalNumber('');
    setClaimType('تجاري');
    setClaimAmount('');
    setIsSecured('no');
    setSecurityType('');
    setSecurityValue('');
    setDebtOriginDate('');
    setDueDate('');
    setDueDocument('');
    setClaimReason('');
    setFiles({});
    setDeclaration(false);
    setSignatureEmpty(true);
    clearSignature();
  }

  // Validation
  function validateStep(step: number): boolean {
    if (step === 1) {
      if (!CREDITOR_TYPES.includes(creditorType)) { toast.error(t.errChooseType); return false; }
      if (!creditorName.trim()) { toast.error(t.errName(isPerson)); return false; }
      if (!idNumber.trim()) { toast.error(t.errId(isPerson)); return false; }
      if (hasApplicant) {
        if (!applicantCapacity) { toast.error(t.errCapacity); return false; }
        if (!representativeName.trim()) { toast.error(t.errYourName); return false; }
        if (!applicantIdNumber.trim()) { toast.error(t.errYourId); return false; }
        // الوكيل يكتب رقمه في خانة الدائن فتُسجَّل المطالبة باسم غير صاحبها
        if (digitsOf(applicantIdNumber) === digitsOf(idNumber)) {
          toast.error(t.errSameId(isPerson));
          return false;
        }
        if (CAPACITY_DOC[applicantCapacity]?.required && !capacityDocument.trim()) {
          toast.error(t.errCapDoc(t.capacityDocLabel(applicantCapacity))); return false;
        }
      }
      if (!phone.trim()) { toast.error(t.errPhone); return false; }
      if (!email.trim()) { toast.error(t.errEmail); return false; }
    }
    if (step === 2) {
      const amount = parseAmount(claimAmount);
      if (amount === null || amount <= 0) { toast.error(t.errAmount); return false; }
      if (isSecured === 'yes' && securityValue.trim() && parseAmount(securityValue) === null) {
        toast.error(t.errSecurity); return false;
      }
      if (!claimReason.trim()) { toast.error(t.errReason); return false; }
    }
    if (step === 3) {
      if (signatureEmpty) { toast.error(t.errSignature); return false; }
      if (!declaration) { toast.error(t.errDeclaration); return false; }
    }
    return true;
  }

  function nextStep() {
    if (!validateStep(currentStep)) return;
    if (currentStep === 3) {
      // الخطوة الأخيرة — إرسال المطالبة مباشرة (تم إلغاء خطوة OTP)
      handleSubmit();
      return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  // Signature
  const setupCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  useEffect(() => {
    if (currentStep === 3 && canvasRef.current) {
      setTimeout(() => setupCanvas(canvasRef.current), 100);
    }
  }, [currentStep, setupCanvas]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    setIsDrawing(true);
    const pos = getPos(e);
    setLastPos(pos);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setLastPos(pos);
    setSignatureEmpty(false);
  }

  function endDraw() {
    setIsDrawing(false);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureEmpty(true);
  }

  function getSignatureData(): string {
    const canvas = canvasRef.current;
    if (!canvas || signatureEmpty) return '';
    return canvas.toDataURL('image/png');
  }

  // File handling
  function handleFileChange(category: string, label: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      const newFiles = { ...files };
      delete newFiles[category];
      setFiles(newFiles);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error(t.errFileSize);
      e.target.value = '';
      return;
    }
    setFiles({ ...files, [category]: { file, label } });
    trackFileUpload(`claim_${category}`);
  }

  // Submit
  async function handleSubmit() {
    if (!selectedCase) return;

    trackClaimSubmit(selectedCase.id);
    setSubmitting(true);
    setSubmitProgress(0);
    setSubmitLabel(t.progSaving);

    const claimData = {
      case_id: selectedCase.id,
      creditor_type: creditorType,
      creditor_name: creditorName,
      id_type: idTypeOut,
      id_number: idNumber.trim(),
      representative_name: hasApplicant ? representativeName.trim() || null : null,
      applicant_capacity: hasApplicant ? applicantCapacity || null : 'أصيل',
      applicant_id_number: hasApplicant ? applicantIdNumber.trim() || null : null,
      capacity_document: hasApplicant ? capacityDocument.trim() || null : null,
      phone,
      email,
      building_number: buildingNumber || null,
      street_name: streetName || null,
      district: district || null,
      city: city || null,
      postal_code: postalCode || null,
      additional_number: additionalNumber || null,
      claim_type: claimType,
      claim_amount: parseAmount(claimAmount),
      is_secured: isSecured === 'yes',
      security_type: isSecured === 'yes' ? securityType : null,
      security_value: isSecured === 'yes' ? parseAmount(securityValue) : null,
      debt_origin_date: debtOriginDate || null,
      due_date: dueDate || null,
      due_document: dueDocument || null,
      claim_reason: claimReason,
      signature: getSignatureData(),
      status: 'جديدة',
      submitted_at: new Date().toISOString()
    };

    // ① رقم الاستلام ومسارات المرفقات تُعرف قبل أي رفع
    const newIntakeId = crypto.randomUUID();
    const categories = Object.keys(files);
    const intakeFiles = categories.map((category) => {
      const ext = files[category].file.name.split('.').pop();
      return { path: `intake/${newIntakeId}/${category}.${ext}`, category, file_name: `${category}.${ext}` };
    });

    try {
      // ② النسخة الخام أولاً — مباشرةً في القاعدة لا عبر الدالة، فلا يضيعها عطلٌ فيها
      setSubmitProgress(5);
      const { error: intakeError } = await supabase
        .from('claim_intake')
        .insert({ id: newIntakeId, case_id: selectedCase.id, payload: claimData, files: intakeFiles });
      if (intakeError) {
        console.error('claim_intake insert failed:', intakeError);
        throw new Error(t.errSendFailed);
      }
      setIntakeId(newIntakeId);
      clearDraft(selectedCase.id);

      // ③ المرفقات إلى مجلد الاستلام — والخادم يربطها بالمطالبة عند تسجيلها
      let failed: string[] = [];
      if (categories.length > 0) {
        failed = await uploadToIntake(newIntakeId, categories, (done) => {
          setSubmitProgress(10 + (done / categories.length) * 50);
        });
      }
      setFailedDocs(failed);

      // ④ التسجيل برقم الاستلام. وإن تعذّر فالمطالبة محفوظة، ويُعيد النظام
      //    تسجيلها تلقائياً — فلا يُقال للدائن «حدث خطأ»
      setSubmitProgress(65);
      setSubmitLabel(t.progRegistering);
      let result: any = null;
      try {
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), 60_000);
        const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-claim`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ intake_id: newIntakeId }),
          signal: ctl.signal,
        });
        clearTimeout(timer);
        result = await response.json().catch(() => null);
        if (!response.ok || !result?.success) {
          console.error('submit-claim (intake) failed:', response.status, result);
          result = null;
        }
      } catch (e) {
        console.error('submit-claim (intake) error:', e);
        result = null;
      }

      const savedClaimId = result?.id ?? null;
      setClaimRef(result?.claim_ref || '');
      setCaseSeq(result?.case_seq ?? null);
      setSavedId(savedClaimId);
      setPendingIntake(!savedClaimId);
      const docsAttachOk = failed.length === 0;

      // إشعار الاستلام (SMS + بريد) يُرسله الخادم داخل submit-claim،
      // فلا يعتمد على بقاء المتصفح مفتوحاً، ولا يحتاج نقاط إرسال مفتوحة للعموم.

      setSubmitProgress(100);
      setSubmitLabel(docsAttachOk ? t.progDone : t.progRegistered);
      trackClaimSuccess(selectedCase.id, docsAttachOk);
      await new Promise(r => setTimeout(r, 800));
      // إغلاق طبقة التحميل فوراً قبل إظهار شاشة النجاح حتى لا تحجب التفاعل
      setSubmitting(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error?.message || t.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }


  /** رفع المرفقات إلى مجلد الاستلام (intake/<id>/)، كل ملفٍ مرتين؛ ويُعاد ما لم يُرفع */
  async function uploadToIntake(id: string, categories: string[], onProgress?: (done: number) => void): Promise<string[]> {
    const failed: string[] = [];
    let done = 0;
    for (const category of categories) {
      const entry = files[category];
      if (!entry) { failed.push(category); continue; }
      setSubmitLabel(t.progUploading(done + 1, categories.length, entry.label));
      const ext = entry.file.name.split('.').pop();
      const filePath = `intake/${id}/${category}.${ext}`;
      let ok = false;
      for (let attempt = 0; attempt < 2 && !ok; attempt++) {
        try {
          const { error } = await supabase.storage.from('claim-documents').upload(filePath, entry.file, { upsert: true });
          if (error) console.error('Upload error:', error); else ok = true;
        } catch (e) {
          console.error('Upload error:', e);
        }
      }
      if (!ok) failed.push(category);
      done++;
      onProgress?.(done);
    }
    return failed;
  }

  /**
   * رفع المرفقات ثم تسجيلها في المطالبة. كل ملفٍ يُحاوَل مرتين، وما لم
   * يصل — رفعاً أو تسجيلاً — يُعاد اسمه ليُعرض للدائن ويُعاد رفعه، ويُقيَّد
   * عند الخادم في سلامة الاستقبال. (كان يُقال «اكتمل الإرسال» وبعضها لم يصل.)
   */
  async function uploadDocs(claimId: number, categories: string[], onProgress?: (done: number) => void): Promise<string[]> {
    const uploaded: Array<{ path: string; category: string; file_name: string }> = [];
    const failed: string[] = [];
    let done = 0;
    for (const category of categories) {
      const entry = files[category];
      if (!entry) { failed.push(category); continue; }
      setSubmitLabel(t.progUploading(done + 1, categories.length, entry.label));
      const ext = entry.file.name.split('.').pop();
      const fileName = `${category}.${ext}`;
      const filePath = `claims/${claimId}/${fileName}`;
      let ok = false;
      for (let attempt = 0; attempt < 2 && !ok; attempt++) {
        try {
          const { error } = await supabase.storage.from('claim-documents').upload(filePath, entry.file, { upsert: true });
          if (error) console.error('Upload error:', error); else ok = true;
        } catch (e) {
          console.error('Upload error:', e);
        }
      }
      if (ok) uploaded.push({ path: filePath, category, file_name: fileName });
      else failed.push(category);
      done++;
      onProgress?.(done);
    }

    setSubmitLabel(t.progAttaching);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/attach-claim-documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ claim_id: claimId, files: uploaded, failed: failed.map((c) => trDocCategory(c, 'ar') ?? c) }),
      });
      const data = await res.json().catch(() => ({}));
      if (uploaded.length > 0) {
        if (res.ok && data.success) failed.push(...((data.missing as string[] | undefined) ?? []));
        else failed.push(...uploaded.map((u) => u.category));
      }
    } catch (e) {
      console.error('attach-claim-documents error:', e);
      failed.push(...uploaded.map((u) => u.category));
    }
    return Array.from(new Set(failed));
  }

  async function retryFailedDocs() {
    if (!failedDocs.length || (!savedId && !intakeId)) return;
    setRetrying(true);
    // سُجّلت المطالبة: تُرفع وتُربط بها. ولم تُسجَّل بعد: تُرفع لمجلد استلامها فتُربط عند تسجيلها
    const still = savedId ? await uploadDocs(savedId, failedDocs) : await uploadToIntake(intakeId!, failedDocs);
    setFailedDocs(still);
    setRetrying(false);
    if (still.length === 0) toast.success(t.docsDone);
    else toast.error(t.docsRetryFail);
  }

  // ==================== RENDER ====================
  const activeCases = cases;

  const inputClass = "w-full px-3 md:px-4 py-2.5 md:py-3 bg-[var(--color-cream)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)] text-sm text-[var(--color-navy)] placeholder-gray-400 transition-all font-body";
  const labelClass = "block text-xs md:text-sm font-semibold text-[var(--color-navy)] mb-1.5 font-body";

  return (
    <>
    <SEOHead
      title={t.seoTitle}
      description={t.seoDesc}
      canonicalUrl="/bankruptcy/claims"
      keywords={['تقديم مطالبة دائن', 'مطالبة دائن إلكترونية', 'مطالبات الإفلاس', 'تقديم مطالبة إفلاس', 'دائنين', 'أمين الإفلاس', 'تصفية', 'القصيم', 'بريدة']}
      ogType="website"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t.seoTitle,
        "description": t.seoDesc,
        "url": `https://redwan.sa${lp("/bankruptcy/claims")}`,
        "inLanguage": lang,
        "isPartOf": {
          "@type": "WebSite",
          "name": "شركة عبدالرحمن بن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس",
          "url": "https://redwan.sa"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://redwan.sa" },
            { "@type": "ListItem", "position": 2, "name": "إجراءات الإفلاس", "item": "https://redwan.sa/bankruptcy" },
            { "@type": "ListItem", "position": 3, "name": "تقديم مطالبة دائن", "item": "https://redwan.sa/bankruptcy/claims" }
          ]
        }
      }}
    />
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-[var(--color-navy)]">
        <div className="container mx-auto px-5 md:px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href={lp("/")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.crumbHome}</Link>
            <span className="text-white/30">/</span>
            <Link href={lp("/bankruptcy")} className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">{t.crumbBankruptcy}</Link>
            <span className="text-white/30">/</span>
            <span className="font-body text-sm text-[var(--color-gold)]">{t.crumbClaims}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.heroTitle}
          </h1>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl">
            {t.heroIntro}
          </p>
          {/* اللغة في الصفحة نفسها: مبدّل رأس الموقع قد لا يلاحظه الدائن */}
          <div className="mt-6 inline-flex rounded-lg border border-white/20 p-1 gap-1" role="group" aria-label="Language">
            {LANG_ORDER.map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${lang === l ? 'bg-[var(--color-gold)] text-white' : 'text-white/70 hover:text-white'}`}
              >
                {LANGS[l].native}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-5 md:px-4 lg:px-8 py-8 md:py-12">
        {/* Success */}
        {success && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            {pendingIntake ? (
              <>
                <h2 className="text-2xl font-bold font-display text-[var(--color-navy)] mb-3">{t.receivedTitle}</h2>
                <p className="text-gray-400 text-sm mb-2">{t.intakeNo} <bdi dir="ltr" className="font-medium text-gray-500">{intakeId?.slice(0, 8).toUpperCase()}</bdi></p>
                <p className="text-gray-500 text-sm mb-8">{t.pendingNote}</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold font-display text-[var(--color-navy)] mb-3">{t.receivedWithNo} <span className="text-[var(--color-gold)]">{caseSeq ?? '—'}</span></h2>
                {claimRef && <p className="text-gray-400 text-sm mb-2">{t.refNo} <span className="font-medium text-gray-500">{claimRef}</span></p>}
                <p className="text-gray-500 text-sm mb-8">{t.studyNote}</p>
              </>
            )}
            {failedDocs.length > 0 && (
              <div className="text-start bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  <AlertTriangle className="w-4 h-4 inline me-1" />
                  {t.docsMissingTitle}
                </p>
                <ul className="text-sm text-amber-900 list-disc ps-5 mb-3">
                  {failedDocs.map((c) => <li key={c}>{files[c]?.label ?? c}</li>)}
                </ul>
                {(savedId || intakeId) && failedDocs.every((c) => files[c]) ? (
                  <button
                    onClick={retryFailedDocs}
                    disabled={retrying}
                    className="px-4 py-2 bg-[var(--color-navy)] text-white text-sm rounded-lg hover:bg-[var(--color-navy-light)] disabled:opacity-60"
                  >
                    {retrying ? t.uploadingShort : t.reupload}
                  </button>
                ) : null}
                <p className="text-xs text-amber-700 mt-3">
                  {t.docsMissingNote}
                </p>
              </div>
            )}
            <div className="bg-[var(--color-navy)]/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-[var(--color-navy)]">
                <Phone className="w-4 h-4 inline me-1" /> <bdi dir="ltr">920032760</bdi> &nbsp;&nbsp;
                <Mail className="w-4 h-4 inline me-1" /> <bdi dir="ltr">bankruptcy@redwan.sa</bdi>
              </p>
            </div>
            <button onClick={backToSelection} className="px-6 py-3 bg-[var(--color-navy)] text-white rounded-lg hover:bg-[var(--color-navy-light)] transition-colors">
              {t.backToCases}
            </button>
          </div>
        )}

        {/* Progress Overlay */}
        {submitting && !success && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">{submitLabel}</h3>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-[var(--color-gold)] h-3 rounded-full transition-all duration-300" style={{ width: `${submitProgress}%` }} />
              </div>
              <p className="text-sm text-gray-500">{Math.round(submitProgress)}%</p>
            </div>
          </div>
        )}

        {/* Case Selection */}
        {!selectedCase && !success && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold font-heading text-[var(--color-navy)] mb-6">{t.chooseCase}</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">{t.loadingCases}</p>
              </div>
            ) : (
              <>
                {/* Active Cases */}
                {activeCases.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                      <h3 className="font-bold text-[var(--color-navy)]">{t.openCases}</h3>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">{activeCases.length}</span>
                    </div>
                    <div className="space-y-4">
                      {activeCases.map(c => {
                        // بعد انقضاء المدة تبقى القضية متاحة للتقديم بلا عدّاد ولا تحذير — التاريخ وحده يظهر أسفل البطاقة
                        const days = daysUntilDeadline(c.claims_deadline);
                        const remaining = days !== null && days > 0 ? days : null;
                        const urgent = remaining !== null && remaining <= 7;
                        const warning = remaining !== null && remaining <= 14;
                        return (
                          <div key={c.id} onClick={() => handleSelectCase(c)}
                            className="bg-white border border-gray-200 hover:border-[var(--color-gold)] hover:shadow-lg rounded-xl cursor-pointer transition-all p-5 group">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-navy)]/10 rounded-lg flex items-center justify-center overflow-hidden">
                                {(c.debtor_logo || c.debtor_logo_url) ? (
                                  <img src={c.debtor_logo || c.debtor_logo_url} alt={c.debtor_name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                ) : (
                                  <Building2 className="w-8 h-8 text-[var(--color-navy)]" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div>
                                    <h4 className="font-bold text-[var(--color-navy)] text-base">{c.debtor_name}</h4>
                                    {c.debtor_name_en && <p className="text-xs text-gray-500 italic" dir="ltr">{c.debtor_name_en}</p>}
                                  </div>
                                  <span className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap border ${urgent ? 'bg-red-50 text-red-700 border-red-200' : warning ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                    {remaining !== null ? (urgent ? `⚠ ${t.daysLeft(remaining)}` : t.daysLeft(remaining)) : t.available}
                                  </span>
                                </div>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--color-navy)]/10 text-[var(--color-navy)] rounded text-xs">{trProcedure(c.procedure_type, lang)}</span>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                                  {c.commercial_reg && <span>{t.regLabel}: <bdi>{c.commercial_reg}</bdi></span>}
                                  {c.case_number && <span>{t.caseLabel}: <bdi>{c.case_number}</bdi></span>}
                                  {c.court_name && <span>{t.courtLabel}: {c.court_name}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                              {c.claims_deadline && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" /> {t.deadlineLabel}: {fmtDate(c.claims_deadline, lang)}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-[var(--color-gold)] font-medium text-sm">
                                {t.submitClaim} {isRTL
                                  ? <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                  : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeCases.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-6">
                    <AlertTriangle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-blue-900">{t.noOpenCases}</p>
                  </div>
                )}

                {activeCases.length > 0 && (
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-800 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      {t.inquiries}: <a href="tel:920032760" dir="ltr" className="font-bold underline">920032760</a> · <a href="mailto:bankruptcy@redwan.sa" className="font-bold underline" dir="ltr">bankruptcy@redwan.sa</a>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Form */}
        {selectedCase && !success && (
          <div className="max-w-3xl mx-auto">
            {/* Case Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 mb-5 md:mb-6 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 bg-[var(--color-navy)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-[var(--color-navy)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[var(--color-navy)]">{selectedCase.debtor_name}</h3>
                <p className="text-xs text-gray-500">{trProcedure(selectedCase.procedure_type, lang)} · {t.caseLabel}: <bdi>{selectedCase.case_number || '-'}</bdi></p>
              </div>
              <button onClick={backToSelection} className="text-sm text-[var(--color-gold)] hover:underline">{t.change}</button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${step < currentStep ? 'bg-green-500 text-white' : step === currentStep ? 'bg-[var(--color-gold)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                  <span className={`text-xs sm:text-sm hidden md:inline ${step === currentStep ? 'text-[var(--color-navy)] font-medium' : 'text-gray-400'}`}>
                    {t.steps[step - 1]}
                  </span>
                  {step < 3 && <div className={`w-4 sm:w-8 h-0.5 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
                {/* ① صاحب الحق */}
                <section>
                  <h2 className="text-xl font-bold font-heading text-[var(--color-navy)] mb-1">{t.creditorTitle}</h2>
                  <p className="text-sm text-gray-500 mb-5">{t.creditorSub}</p>

                  <div className="mb-5">
                    <label className={labelClass}>{t.creditorTypeLabel}</label>
                    <div className="flex gap-2 flex-wrap">
                      {CREDITOR_TYPES.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => { setCreditorType(type); if (type === 'فرد') { setOnBehalf('self'); setApplicantCapacity(''); } }}
                          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${creditorType === type ? 'border-[var(--color-gold)] bg-[var(--color-cream)] text-[var(--color-navy)] font-medium' : 'border-[var(--color-border)] text-gray-600 hover:border-[var(--color-gold)]'}`}
                          aria-pressed={creditorType === type}
                        >
                          {trCreditorType(type, lang)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {!creditorType && <p className="text-sm text-gray-500">{t.chooseTypeHint}</p>}
                  {creditorType && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={isPerson ? '' : 'md:col-span-2'}>
                      <label className={labelClass}>{t.nameLabel(creditorType)}</label>
                      <input type="text" value={creditorName} onChange={e => setCreditorName(e.target.value)} className={inputClass} required />
                    </div>
                    {isPerson && (
                      <div>
                        <label className={labelClass}>{t.idTypeLabel}</label>
                        <select value={idType} onChange={e => setIdType(e.target.value)} className={inputClass}>
                          {['هوية وطنية', 'إقامة', 'جواز سفر'].map(v => <option key={v} value={v}>{trIdType(v, lang)}</option>)}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className={labelClass}>{t.idNumberLabel(creditorType)}</label>
                      <input type="text" inputMode="numeric" value={idNumber} onChange={e => setIdNumber(e.target.value)} className={inputClass} dir="ltr" required />
                      <p className="text-xs text-gray-500 mt-1">{t.idNumberHint}</p>
                    </div>
                  </div>
                  )}
                </section>

                {creditorType && (<>
                {/* ② من يقدّم المطالبة */}
                <section className="border-t border-gray-100 pt-6">
                  <h2 className="text-xl font-bold font-heading text-[var(--color-navy)] mb-4">{t.whoTitle}</h2>
                  {isPerson && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      {([
                        ['self', t.selfTitle, t.selfSub],
                        ['other', t.otherTitle, t.otherSub],
                      ] as const).map(([v, t, sub]) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setOnBehalf(v)}
                          aria-pressed={onBehalf === v}
                          className={`text-start rounded-xl border p-4 transition-colors ${onBehalf === v ? 'border-2 border-[var(--color-gold)] bg-[var(--color-cream)]' : 'border-[var(--color-border)] hover:border-[var(--color-gold)]'}`}
                        >
                          <span className="block font-medium text-[var(--color-navy)]">{t}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">{sub}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {!isPerson && (
                    <p className="text-sm text-gray-500 mb-4">{t.orgApplicantNote}</p>
                  )}

                  {hasApplicant && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>{t.capacityLabel}</label>
                        <select value={applicantCapacity} onChange={e => setApplicantCapacity(e.target.value)} className={inputClass}>
                          <option value="">{t.choose}</option>
                          {capacities.map(c => <option key={c} value={c}>{trCapacity(c, lang)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>{t.applicantNameLabel}</label>
                        <input type="text" value={representativeName} onChange={e => setRepresentativeName(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>{t.applicantIdLabel}</label>
                        <input type="text" inputMode="numeric" value={applicantIdNumber} onChange={e => setApplicantIdNumber(e.target.value)} className={inputClass} dir="ltr" />
                        {applicantIdNumber.trim() && digitsOf(applicantIdNumber) === digitsOf(idNumber) && (
                          <p className="text-xs text-red-600 mt-1">{t.sameIdInline(isPerson)}</p>
                        )}
                      </div>
                      {CAPACITY_DOC[applicantCapacity] && (
                        <div>
                          <label className={labelClass}>{t.capacityDocLabel(applicantCapacity)}{CAPACITY_DOC[applicantCapacity].required ? ' *' : ''}</label>
                          <input type="text" value={capacityDocument} onChange={e => setCapacityDocument(e.target.value)} className={inputClass} dir="ltr" />
                        </div>
                      )}
                    </div>
                  )}
                </section>

                {/* ③ التواصل */}
                <section className="border-t border-gray-100 pt-6">
                  <h2 className="text-xl font-bold font-heading text-[var(--color-navy)] mb-1">{t.contactTitle}</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    {hasApplicant ? t.contactApplicant : t.contactSelf}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{t.phoneLabel}</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="05xxxxxxxx" className={inputClass} dir="ltr" required />
                    </div>
                    <div>
                      <label className={labelClass}>{t.emailLabel}</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} dir="ltr" required />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className={labelClass}>{t.addressLabel(isPerson)}</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <input type="text" value={buildingNumber} onChange={e => setBuildingNumber(e.target.value)} placeholder={t.addr.building} className={inputClass} />
                      <input type="text" value={streetName} onChange={e => setStreetName(e.target.value)} placeholder={t.addr.street} className={inputClass} />
                      <input type="text" value={district} onChange={e => setDistrict(e.target.value)} placeholder={t.addr.district} className={inputClass} />
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder={t.addr.city} className={inputClass} />
                      <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder={t.addr.postal} className={inputClass} dir="ltr" />
                      <input type="text" value={additionalNumber} onChange={e => setAdditionalNumber(e.target.value)} placeholder={t.addr.additional} className={inputClass} dir="ltr" />
                    </div>
                  </div>
                </section>
                </>)}
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold font-heading text-[var(--color-navy)] mb-6">{t.detailsTitle}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{t.claimTypeLabel}</label>
                    <select value={claimType} onChange={e => setClaimType(e.target.value)} className={inputClass}>
                      {['عمالي', 'تجاري', 'بنوك', 'حكومي'].map(v => <option key={v} value={v}>{trClaimType(v, lang)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t.amountLabel}</label>
                    <input type="text" inputMode="decimal" value={claimAmount} onChange={e => setClaimAmount(e.target.value)} placeholder={t.amountPlaceholder} className={inputClass} dir="ltr" required />
                    <AmountPreview raw={claimAmount} t={t} />
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>{t.securedQ}</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="yes" checked={isSecured === 'yes'} onChange={() => setIsSecured('yes')} className="accent-[var(--color-gold)]" />
                      <span className="text-sm">{t.yes}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="no" checked={isSecured === 'no'} onChange={() => setIsSecured('no')} className="accent-[var(--color-gold)]" />
                      <span className="text-sm">{t.no}</span>
                    </label>
                  </div>
                </div>

                {isSecured === 'yes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-4 bg-[var(--color-cream)] rounded-lg border border-[var(--color-border)]">
                    <div>
                      <label className={labelClass}>{t.securityTypeLabel}</label>
                      <select value={securityType} onChange={e => setSecurityType(e.target.value)} className={inputClass}>
                        <option value="">{t.choose}</option>
                        {['رهن عقاري', 'رهن منقول', 'كفالة بنكية', 'كفالة شخصية', 'أخرى'].map(v => <option key={v} value={v}>{trSecurityType(v, lang)}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{t.securityValueLabel}</label>
                      <input type="text" inputMode="decimal" value={securityValue} onChange={e => setSecurityValue(e.target.value)} className={inputClass} dir="ltr" />
                      <AmountPreview raw={securityValue} t={t} />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className={labelClass}>{t.originDate}</label>
                    <input type="date" value={debtOriginDate} onChange={e => setDebtOriginDate(e.target.value)} className={inputClass} dir="ltr" />
                  </div>
                  <div>
                    <label className={labelClass}>{t.dueDate}</label>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputClass} dir="ltr" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>{t.dueDocLabel}</label>
                    <input type="text" value={dueDocument} onChange={e => setDueDocument(e.target.value)} placeholder={t.dueDocPlaceholder} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>{t.reasonLabel}</label>
                    <textarea value={claimReason} onChange={e => setClaimReason(e.target.value)} rows={4} placeholder={t.reasonPlaceholder} className={inputClass} required />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Documents & Signature */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold font-heading text-[var(--color-navy)] mb-6">{t.docsTitle}</h2>

                <div className="space-y-4 mb-8">
                  {/* ما يلزم بحسب إجابات الخطوة الأولى، لا السبعة لكل أحد */}
                  {[
                    { key: 'creditor_id', label: isPerson ? t.doc.creditorIdPerson : creditorType === 'جهة حكومية' ? t.doc.creditorIdGov : t.doc.creditorIdOrg },
                    hasApplicant && { key: 'applicant_id', label: t.doc.applicantId },
                    hasApplicant && { key: 'capacity_document', label: applicantCapacity === 'موظف مفوَّض' ? t.doc.capAuth : applicantCapacity === 'ممثل نظامي' ? t.doc.capRep : t.doc.capAgency },
                    !isPerson && creditorType !== 'جهة حكومية' && { key: 'power_of_attorney', label: t.doc.articles },
                    { key: 'opening_document', label: t.doc.opening },
                    { key: 'due_document', label: t.doc.due },
                    isSecured === 'yes' && { key: 'security_document', label: t.doc.security },
                  ].filter((d): d is { key: string; label: string } => Boolean(d)).map(doc => (
                    <div key={doc.key} className="flex items-center gap-3 p-3 bg-[var(--color-cream)] rounded-lg border border-[var(--color-border)]">
                      <Upload className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--color-navy)] font-medium">{doc.label}</p>
                        {files[doc.key] && (
                          <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {files[doc.key].file.name}
                          </p>
                        )}
                      </div>
                      <label className="px-3 py-1.5 bg-white border border-[var(--color-gold)] text-[var(--color-gold)] rounded text-xs font-medium cursor-pointer hover:bg-[var(--color-gold)] hover:text-white transition-colors">
                        {t.chooseFile}
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => handleFileChange(doc.key, doc.label, e)} />
                      </label>
                    </div>
                  ))}
                </div>

                {/* Signature */}
                <div className="mb-6">
                  <label className={labelClass}>{t.signature}</label>
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-1 bg-white">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-40 cursor-crosshair touch-none"
                      onMouseDown={startDraw}
                      onMouseMove={draw}
                      onMouseUp={endDraw}
                      onMouseLeave={endDraw}
                      onTouchStart={startDraw}
                      onTouchMove={draw}
                      onTouchEnd={endDraw}
                    />
                  </div>
                  <button type="button" onClick={clearSignature} className="mt-2 text-xs text-red-500 hover:underline">{t.clearSignature}</button>
                </div>

                {/* Declaration */}
                <label className="flex items-start gap-3 p-4 bg-[var(--color-navy)]/5 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} className="mt-1 accent-[var(--color-gold)] w-4 h-4" />
                  <span className="text-sm text-[var(--color-navy)]">
                    {t.declaration}
                    {lang !== 'ar' && (
                      <span className="block mt-2 pt-2 border-t border-[var(--color-navy)]/10 text-xs text-[var(--color-navy)]/70">
                        {t.declarationArNote}
                        <span dir="rtl" lang="ar" className="block mt-1">{DECLARATION_AR}</span>
                      </span>
                    )}
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-5 md:mt-6 gap-3">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="px-4 md:px-6 py-2.5 md:py-3 text-sm border border-[var(--color-navy)] text-[var(--color-navy)] rounded-lg hover:bg-[var(--color-navy)] hover:text-white active:scale-[0.97] transition-all">
                  {t.prev}
                </button>
              ) : (
                <div />
              )}
              {currentStep < 3 ? (
                <button onClick={nextStep} className="px-6 md:px-8 py-2.5 md:py-3 text-sm bg-[var(--color-gold)] text-white rounded-lg hover:bg-[#b08d1f] active:scale-[0.97] transition-all font-medium">
                  {t.next}
                </button>
              ) : (
                <button onClick={nextStep} disabled={submitting} className="px-6 md:px-8 py-2.5 md:py-3 text-sm bg-[var(--color-gold)] text-white rounded-lg hover:bg-[#b08d1f] active:scale-[0.97] transition-all font-medium disabled:opacity-50">
                  <FileText className="w-4 h-4 inline me-2" />
                  {submitting ? t.sending : t.confirmSend}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
