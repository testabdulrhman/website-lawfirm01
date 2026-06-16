import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';
import { Link } from 'wouter';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import { FileText, Upload, ChevronLeft, Calendar, Building2, Lock, AlertTriangle, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';

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
function isDeadlineExpired(deadline?: string): boolean {
  if (!deadline) return false;
  try {
    const d = new Date(deadline);
    if (isNaN(d.getTime())) return false;
    d.setHours(23, 59, 59, 999);
    return new Date() > d;
  } catch { return false; }
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

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return dateStr; }
}

function escapeHtml(str: string | null | undefined): string {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export default function Claims() {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitLabel, setSubmitLabel] = useState('');
  const [success, setSuccess] = useState(false);
  const [claimRef, setClaimRef] = useState('');
  const [caseSeq, setCaseSeq] = useState<number | null>(null);

  // Form state
  const [creditorType, setCreditorType] = useState('فرد');
  const [creditorName, setCreditorName] = useState('');
  const [idType, setIdType] = useState('هوية وطنية');
  const [idNumber, setIdNumber] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
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

  // Load cases
  useEffect(() => {
    loadCases();
  }, []);

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
    } catch (e) {
      console.error('Load cases error:', e);
      toast.error('تعذّر تحميل القضايا');
    } finally {
      setLoading(false);
    }
  }

  function handleSelectCase(c: CaseData) {
    if (isDeadlineExpired(c.claims_deadline)) {
      toast.error('انتهى الموعد النظامي لتقديم المطالبات لهذه القضية');
      return;
    }
    setSelectedCase(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToSelection() {
    setSelectedCase(null);
    setCurrentStep(1);
    setSuccess(false);
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setCreditorType('فرد');
    setCreditorName('');
    setIdType('هوية وطنية');
    setIdNumber('');
    setRepresentativeName('');
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
      if (!creditorName.trim()) { toast.error('يرجى إدخال اسم الدائن'); return false; }
      if (!idNumber.trim()) { toast.error('يرجى إدخال رقم الهوية'); return false; }
      if (!phone.trim()) { toast.error('يرجى إدخال رقم الجوال'); return false; }
      if (!email.trim()) { toast.error('يرجى إدخال البريد الإلكتروني'); return false; }
    }
    if (step === 2) {
      if (!claimAmount || parseFloat(claimAmount) <= 0) { toast.error('يرجى إدخال مبلغ المطالبة'); return false; }
      if (!claimReason.trim()) { toast.error('يرجى إدخال سبب المطالبة'); return false; }
    }
    if (step === 3) {
      if (signatureEmpty) { toast.error('يرجى إضافة توقيعك'); return false; }
      if (!declaration) { toast.error('يرجى الموافقة على الإقرار'); return false; }
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
      toast.error('الملف أكبر من 10 ميجا');
      e.target.value = '';
      return;
    }
    setFiles({ ...files, [category]: { file, label } });
  }

  // Submit
  async function handleSubmit() {
    if (!selectedCase) return;

    setSubmitting(true);
    setSubmitProgress(0);
    setSubmitLabel('حفظ بيانات المطالبة...');

    const addressParts = [buildingNumber, streetName, district, city, postalCode, additionalNumber].filter(Boolean);

    const claimData = {
      case_id: selectedCase.id,
      creditor_type: creditorType,
      creditor_name: creditorName,
      id_type: idType,
      id_number: idNumber,
      representative_name: representativeName || null,
      phone,
      email,
      address: addressParts.join(' - '),
      building_number: buildingNumber || null,
      street_name: streetName || null,
      district: district || null,
      city: city || null,
      postal_code: postalCode || null,
      additional_number: additionalNumber || null,
      claim_type: claimType,
      claim_amount: parseFloat(claimAmount),
      is_secured: isSecured === 'yes',
      security_type: isSecured === 'yes' ? securityType : null,
      security_value: isSecured === 'yes' ? parseFloat(securityValue) || null : null,
      debt_origin_date: debtOriginDate || null,
      due_date: dueDate || null,
      due_document: dueDocument || null,
      claim_reason: claimReason,
      signature: getSignatureData(),
      status: 'جديدة',
      submitted_at: new Date().toISOString()
    };

    try {
      // Step 1: Save claim via Edge Function
      setSubmitProgress(10);
      const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(claimData)
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || 'فشل في إرسال المطالبة');
      }

      const savedClaimId = result.id || result.claim_id || null;
      const savedClaimRef = result.claim_ref || '';
      setClaimRef(savedClaimRef);
      setCaseSeq(result.case_seq ?? null);
      setSubmitProgress(25);
      setSubmitLabel('تم حفظ البيانات...');

      // تتبّع نجاح إرفاق المستندات (للتنبيه اللطيف عند الفشل)
      let docsAttachOk = true;

      // Step 2: Upload files — كل المسارات تعتمد على id الفريد
      const categories = Object.keys(files);
      const totalFiles = categories.length;

      // إيقاف الرفع تماماً إن لم يُرجع submit-claim قيمة id صالحة
      if (totalFiles > 0 && !savedClaimId) {
        console.error('submit-claim لم يُرجع id صالحاً — تم تخطّي رفع المستندات لتفادي مسار ناقص.');
        docsAttachOk = false;
      } else if (totalFiles > 0 && savedClaimId) {
        const uploadedFiles: Array<{ path: string; category: string; file_name: string }> = [];
        let filesDone = 0;

        for (const category of categories) {
          const { file, label } = files[category];
          setSubmitLabel(`رفع المرفق ${filesDone + 1} من ${totalFiles}: ${label}`);

          const ext = file.name.split('.').pop();
          const fileName = `${category}.${ext}`;
          const filePath = `claims/${savedClaimId}/${fileName}`;

          try {
            const { error: uploadError } = await supabase.storage
              .from('claim-documents').upload(filePath, file, { upsert: true });

            if (!uploadError) {
              uploadedFiles.push({ path: filePath, category, file_name: fileName });
            } else {
              console.error('Upload error:', uploadError);
            }
          } catch (uploadEx) {
            console.error('Upload error:', uploadEx);
          }

          filesDone++;
          setSubmitProgress(25 + (filesDone / totalFiles) * 40);
        }

        // استدعاء attach-claim-documents لتسجيل الروابط في حقل documents
        if (uploadedFiles.length > 0) {
          setSubmitLabel('إرفاق المستندات بالمطالبة...');
          try {
            const attachRes = await fetch(`${SUPABASE_URL}/functions/v1/attach-claim-documents`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
              },
              body: JSON.stringify({ claim_id: savedClaimId, files: uploadedFiles })
            });
            const attachData = await attachRes.json();
            if (!attachRes.ok || !attachData.success || !attachData.attached) {
              console.error('attach-claim-documents failed:', attachData);
              docsAttachOk = false;
            }
          } catch (attachEx) {
            console.error('attach-claim-documents error:', attachEx);
            docsAttachOk = false;
          }
        } else {
          // رُفعت ملفات لكن لم ينجح أي رفع فعلي
          docsAttachOk = false;
        }
      }

      setSubmitProgress(70);
      setSubmitLabel('إنشاء نموذج PDF...');

      // Step 3: Generate PDF (using html2pdf) — المسار موحّد على id
      if (savedClaimId) {
        try {
          const pdfBlob = await generateClaimPDF(claimData, savedClaimRef);
          if (pdfBlob) {
            const pdfPath = `claims/${savedClaimId}/claim_form.pdf`;
            await supabase.storage.from('claim-documents').upload(pdfPath, pdfBlob, { contentType: 'application/pdf', upsert: true });
          }
        } catch (pdfErr) {
          console.warn('PDF generation failed (non-critical):', pdfErr);
        }
      }

      setSubmitProgress(85);
      setSubmitLabel('إرسال التأكيد...');

      // Step 4: Send SMS & Email
      try {
        const confirmMsg = `شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس\n\nتم استلام مطالبتكم رقم ${savedClaimRef} بنجاح.\nسيتم دراستها وإبلاغكم بالنتيجة.\n\nللاستفسار: 920032760`;
        await fetch(`${SUPABASE_URL}/functions/v1/send-sms`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
          body: JSON.stringify({ numbers: phone, msg: confirmMsg, claim_id: savedClaimId, case_id: selectedCase.id, type: 'claim_received' })
        });
      } catch { /* non-critical */ }

      try {
        const emailHtml = buildConfirmationEmail(savedClaimRef, creditorName, claimData.claim_amount, claimType, selectedCase.debtor_name);
        await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
          body: JSON.stringify({ to: email, subject: `تأكيد استلام المطالبة رقم ${savedClaimRef}`, html: emailHtml, claim_id: savedClaimId, case_id: selectedCase.id, type: 'claim_received' })
        });
      } catch { /* non-critical */ }

      setSubmitProgress(100);
      setSubmitLabel(docsAttachOk ? 'اكتمل الإرسال بنجاح!' : 'تم تسجيل المطالبة');
      await new Promise(r => setTimeout(r, 800));
      // تنبيه لطيف: المطالبة سُجّلت لكن تعذّر إرفاق المستندات (لا تُلغى المطالبة)
      if (!docsAttachOk) {
        toast.warning(`سُجّلت مطالبتك برقم ${savedClaimRef}، لكن تعذّر إرفاق بعض المستندات. سنتواصل معك لاستكمالها.`, { duration: 9000 });
      }
      // إغلاق طبقة التحميل فوراً قبل إظهار شاشة النجاح حتى لا تحجب التفاعل
      setSubmitting(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى');
    } finally {
      setSubmitting(false);
    }
  }

  // PDF Generation
  async function generateClaimPDF(data: any, claimRefStr: string): Promise<Blob | null> {
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const amount = parseFloat(data.claim_amount || 0).toLocaleString();
      const submitDate = data.submitted_at ? new Date(data.submitted_at).toLocaleDateString('ar-SA') : '-';
      const procedureType = selectedCase?.procedure_type || 'التصفية';
      const debtorName = selectedCase?.debtor_name || '';

      const htmlContent = `
        <div dir="rtl" style="font-family: Arial, Tahoma, sans-serif; background: white; color: #000; font-size: 9pt; line-height: 1.35; padding: 10px;">
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="font-weight: bold; font-size: 10pt; margin-bottom: 4px;">(نموذج)</div>
            <div style="font-size: 11pt; font-weight: bold; margin-bottom: 4px;">طلب إدراج مطالبة الدائن للمدين في قائمة المطالبات</div>
            <div style="font-size: 9pt;">المعد بموجب المادة (الثالثة عشرة) من اللائحة التنفيذية لنظام الإفلاس</div>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:8pt;">
            <tr><td colspan="4" style="border:1px solid #000;background:#e7e6e6;font-weight:bold;text-align:center;padding:4px;">بيانات الدائن</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">نوع الدائن</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(data.creditor_type)}</td><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">الاسم</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(data.creditor_name)}</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">رقم الهوية</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(data.id_number)}</td><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">الجوال</td><td style="border:1px solid #000;padding:3px;" dir="ltr">${escapeHtml(data.phone)}</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">البريد</td><td style="border:1px solid #000;padding:3px;" dir="ltr">${escapeHtml(data.email)}</td><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">العنوان</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(data.address)}</td></tr>
            <tr><td colspan="4" style="border:1px solid #000;background:#e7e6e6;font-weight:bold;text-align:center;padding:4px;">بيانات المدين</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">الاسم</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(debtorName)}</td><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">نوع الإجراء</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(procedureType)}</td></tr>
            <tr><td colspan="4" style="border:1px solid #000;background:#e7e6e6;font-weight:bold;text-align:center;padding:4px;">بيانات المطالبة</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">نوع المطالبة</td><td style="border:1px solid #000;padding:3px;">${escapeHtml(data.claim_type)}</td><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">المبلغ</td><td style="border:1px solid #000;padding:3px;font-weight:bold;">${amount} ريال</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">السبب</td><td colspan="3" style="border:1px solid #000;padding:3px;">${escapeHtml(data.claim_reason)}</td></tr>
            <tr><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">التوقيع</td><td style="border:1px solid #000;padding:3px;height:40px;">${data.signature ? `<img src="${data.signature}" style="max-width:100px;max-height:35px;" />` : ''}</td><td style="border:1px solid #000;background:#e7e6e6;padding:3px;font-weight:bold;">التاريخ</td><td style="border:1px solid #000;padding:3px;">${submitDate}</td></tr>
          </table>
        </div>
      `;

      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '179mm';
      document.body.appendChild(container);
      await new Promise(r => setTimeout(r, 300));

      const element = container.firstElementChild;
      if (!element) { document.body.removeChild(container); return null; }
      const pdfBlob = await html2pdf().set({
        margin: [10, 15, 15, 15],
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element as HTMLElement).output('blob');

      document.body.removeChild(container);
      return pdfBlob;
    } catch (e) {
      console.error('PDF error:', e);
      return null;
    }
  }

  function buildConfirmationEmail(ref: string, name: string, amount: number, type: string, debtor: string): string {
    return `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Arial,sans-serif;background:#f5f5f5;direction:rtl;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f5f5;padding:30px 0;">
        <tr><td align="center">
          <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
            <tr><td style="background:#1e3a5f;padding:24px 30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:20px;">شركة عبدالرحمن رضوان المشيقح للمحاماة وإدارة إجراءات الإفلاس</h1>
              <p style="color:#c9a227;margin:4px 0 0 0;font-size:13px;">وإدارة إجراءات الإفلاس</p>
            </td></tr>
            <tr><td style="padding:30px;color:#333;font-size:14px;line-height:1.8;">
              <p>الأستاذ/ة ${escapeHtml(name)}،</p>
              <p>تم استلام مطالبتكم رقم <strong>${escapeHtml(ref)}</strong> في قضية <strong>${escapeHtml(debtor)}</strong> بنجاح.</p>
              <div style="background:#f9fafb;border-right:3px solid #c9a227;padding:14px 18px;margin:16px 0;border-radius:4px;">
                <p style="margin:0 0 6px 0;"><strong>رقم المرجع:</strong> ${escapeHtml(ref)}</p>
                <p style="margin:0 0 6px 0;"><strong>المبلغ:</strong> ${amount.toLocaleString()} ريال</p>
                <p style="margin:0;"><strong>نوع المطالبة:</strong> ${escapeHtml(type)}</p>
              </div>
              <p>سيتم دراسة المطالبة وإبلاغكم بالنتيجة.</p>
              <p>للاستفسار: 920032760 · bankruptcy@redwan.sa</p>
            </td></tr>
            <tr><td style="background:#f9fafb;padding:18px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#6b7280;">redwan.sa</td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>`;
  }

  // ==================== RENDER ====================
  const activeCases = cases.filter(c => !isDeadlineExpired(c.claims_deadline));
  const closedCases = cases.filter(c => isDeadlineExpired(c.claims_deadline));

  const inputClass = "w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#faf8f5] border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] text-sm text-[#1e3a5f] placeholder-gray-400 transition-all";
  const labelClass = "block text-xs md:text-sm font-semibold text-[#1e3a5f] mb-1.5";

  return (
    <>
    <SEOHead
      title="تقديم مطالبة دائن"
      description="نموذج تقديم مطالبة دائن في إجراءات الإفلاس لدى شركة عبدالرحمن رضوان المشيقح للمحاماة"
      canonicalUrl="/bankruptcy/claims"
      keywords={['مطالبة دائن', 'إفلاس', 'تقديم مطالبة', 'دائنين']}
    />
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="bg-[#1e3a5f] pt-28 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a227] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-white/60 mb-4 md:mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#c9a227] transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link href="/services/bankruptcy" className="hover:text-[#c9a227] transition-colors">الإفلاس والتصفية</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#c9a227]">تقديم مطالبة</span>
          </nav>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-['Playfair_Display',serif] mb-3 md:mb-4">
            تقديم مطالبة دائن
          </h1>
          <p className="text-white/70 text-sm md:text-lg max-w-2xl">
            وفقاً لأحكام نظام الإفلاس ولائحته التنفيذية — المادة (56)
          </p>
        </div>
      </section>

      <div className="container py-8 md:py-12 px-5 md:px-4">
        {/* Success */}
        {success && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">تم استلام مطالبتك — رقم مطالبتك: <span className="text-[#c9a227]">{caseSeq ?? '—'}</span></h2>
            {claimRef && <p className="text-gray-400 text-sm mb-2">رقم المرجع: <span className="font-medium text-gray-500">{claimRef}</span></p>}
            <p className="text-gray-500 text-sm mb-8">سيتم دراسة المطالبة من قبل أمين الإفلاس وإبلاغكم بالنتيجة</p>
            <div className="bg-[#1e3a5f]/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-[#1e3a5f]">
                <Phone className="w-4 h-4 inline ml-1" /> 920032760 &nbsp;&nbsp;
                <Mail className="w-4 h-4 inline ml-1" /> bankruptcy@redwan.sa
              </p>
            </div>
            <button onClick={backToSelection} className="px-6 py-3 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4f7a] transition-colors">
              العودة لقائمة القضايا
            </button>
          </div>
        )}

        {/* Progress Overlay */}
        {submitting && !success && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 border-4 border-[#c9a227] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{submitLabel}</h3>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-[#c9a227] h-3 rounded-full transition-all duration-300" style={{ width: `${submitProgress}%` }} />
              </div>
              <p className="text-sm text-gray-500">{Math.round(submitProgress)}%</p>
            </div>
          </div>
        )}

        {/* Case Selection */}
        {!selectedCase && !success && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">اختر القضية التي ترغب بتقديم مطالبة فيها</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#c9a227] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">جاري تحميل القضايا...</p>
              </div>
            ) : (
              <>
                {/* Active Cases */}
                {activeCases.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                      <h3 className="font-bold text-[#1e3a5f]">القضايا المفتوحة</h3>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">{activeCases.length}</span>
                    </div>
                    <div className="space-y-4">
                      {activeCases.map(c => {
                        const days = daysUntilDeadline(c.claims_deadline);
                        const urgent = days !== null && days <= 7;
                        const warning = days !== null && days <= 14;
                        return (
                          <div key={c.id} onClick={() => handleSelectCase(c)}
                            className="bg-white border border-gray-200 hover:border-[#c9a227] hover:shadow-lg rounded-xl cursor-pointer transition-all p-5 group">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center overflow-hidden">
                                {(c.debtor_logo || c.debtor_logo_url) ? (
                                  <img src={c.debtor_logo || c.debtor_logo_url} alt={c.debtor_name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                ) : (
                                  <Building2 className="w-8 h-8 text-[#1e3a5f]" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div>
                                    <h4 className="font-bold text-[#1e3a5f] text-base">{c.debtor_name}</h4>
                                    {c.debtor_name_en && <p className="text-xs text-gray-500 italic" dir="ltr">{c.debtor_name_en}</p>}
                                  </div>
                                  <span className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap border ${urgent ? 'bg-red-50 text-red-700 border-red-200' : warning ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                    {days !== null ? (urgent ? `⚠ ${days} يوم متبقي` : `${days} يوم متبقي`) : 'متاح'}
                                  </span>
                                </div>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded text-xs">{c.procedure_type}</span>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                                  {c.commercial_reg && <span>السجل: {c.commercial_reg}</span>}
                                  {c.case_number && <span>قضية: {c.case_number}</span>}
                                  {c.court_name && <span>المحكمة: {c.court_name}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                              {c.claims_deadline && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" /> آخر موعد: {formatDate(c.claims_deadline)}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-[#c9a227] font-medium text-sm">
                                تقديم مطالبة <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
                    <p className="text-sm font-medium text-blue-900">لا توجد قضايا مفتوحة حالياً لاستقبال المطالبات</p>
                  </div>
                )}

                {/* Closed Cases */}
                {closedCases.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <h3 className="font-bold text-gray-600">القضايا المقفلة</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{closedCases.length}</span>
                    </div>
                    <div className="space-y-2">
                      {closedCases.map(c => (
                        <div key={c.id} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
                          <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-sm text-gray-700">{c.debtor_name}</span>
                            <span className="text-xs text-gray-500 mr-2">{c.procedure_type}</span>
                            {c.claims_deadline && <div className="text-xs text-gray-500 mt-0.5">انتهت {formatDate(c.claims_deadline)}</div>}
                          </div>
                          <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-medium">مقفلة</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-blue-800 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                        للاستفسار: <a href="tel:920032760" className="font-bold underline">920032760</a> · <a href="mailto:bankruptcy@redwan.sa" className="font-bold underline" dir="ltr">bankruptcy@redwan.sa</a>
                      </p>
                    </div>
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
              <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1e3a5f]">{selectedCase.debtor_name}</h3>
                <p className="text-xs text-gray-500">{selectedCase.procedure_type} · قضية: {selectedCase.case_number || '-'}</p>
              </div>
              <button onClick={backToSelection} className="text-sm text-[#c9a227] hover:underline">تغيير</button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${step < currentStep ? 'bg-green-500 text-white' : step === currentStep ? 'bg-[#c9a227] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                  <span className={`text-xs sm:text-sm hidden md:inline ${step === currentStep ? 'text-[#1e3a5f] font-medium' : 'text-gray-400'}`}>
                    {step === 1 ? 'بيانات الدائن' : step === 2 ? 'تفاصيل المطالبة' : 'المستندات والتوقيع'}
                  </span>
                  {step < 3 && <div className={`w-4 sm:w-8 h-0.5 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">بيانات الدائن</h2>

                <div className="mb-5">
                  <label className={labelClass}>نوع الدائن</label>
                  <div className="flex gap-4 flex-wrap">
                    {['فرد', 'شركة-مؤسسة', 'جهة حكومية'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="creditorType" value={type} checked={creditorType === type} onChange={(e) => setCreditorType(e.target.value)} className="accent-[#c9a227]" />
                        <span className="text-sm text-[#1e3a5f]">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>اسم الدائن *</label>
                    <input type="text" value={creditorName} onChange={e => setCreditorName(e.target.value)} placeholder="الاسم الكامل / اسم الشركة" className={inputClass} required />
                  </div>
                  {creditorType !== 'فرد' && (
                    <div>
                      <label className={labelClass}>اسم الممثل النظامي</label>
                      <input type="text" value={representativeName} onChange={e => setRepresentativeName(e.target.value)} className={inputClass} />
                    </div>
                  )}
                  <div>
                    <label className={labelClass}>نوع الهوية *</label>
                    <select value={idType} onChange={e => setIdType(e.target.value)} className={inputClass}>
                      <option value="هوية وطنية">هوية وطنية</option>
                      <option value="إقامة">إقامة</option>
                      <option value="سجل تجاري">سجل تجاري</option>
                      <option value="جواز سفر">جواز سفر</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>رقم الهوية / السجل *</label>
                    <input type="text" value={idNumber} onChange={e => setIdNumber(e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>رقم الجوال *</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="05xxxxxxxx" className={inputClass} dir="ltr" required />
                  </div>
                  <div>
                    <label className={labelClass}>البريد الإلكتروني *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} dir="ltr" required />
                  </div>
                </div>

                <div className="mt-6">
                  <label className={labelClass}>العنوان الوطني</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <input type="text" value={buildingNumber} onChange={e => setBuildingNumber(e.target.value)} placeholder="رقم المبنى" className={inputClass} />
                    <input type="text" value={streetName} onChange={e => setStreetName(e.target.value)} placeholder="اسم الشارع" className={inputClass} />
                    <input type="text" value={district} onChange={e => setDistrict(e.target.value)} placeholder="الحي" className={inputClass} />
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="المدينة" className={inputClass} />
                    <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="الرمز البريدي" className={inputClass} dir="ltr" />
                    <input type="text" value={additionalNumber} onChange={e => setAdditionalNumber(e.target.value)} placeholder="الرقم الإضافي" className={inputClass} dir="ltr" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">تفاصيل المطالبة</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>نوع المطالبة *</label>
                    <select value={claimType} onChange={e => setClaimType(e.target.value)} className={inputClass}>
                      <option value="عمالي">عمالي</option>
                      <option value="تجاري">تجاري</option>
                      <option value="بنوك">بنوك</option>
                      <option value="حكومي">حكومي</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>مبلغ المطالبة (ريال) *</label>
                    <input type="number" value={claimAmount} onChange={e => setClaimAmount(e.target.value)} placeholder="0.00" className={inputClass} dir="ltr" required />
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>هل المطالبة مضمونة؟</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="yes" checked={isSecured === 'yes'} onChange={() => setIsSecured('yes')} className="accent-[#c9a227]" />
                      <span className="text-sm">نعم</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="no" checked={isSecured === 'no'} onChange={() => setIsSecured('no')} className="accent-[#c9a227]" />
                      <span className="text-sm">لا</span>
                    </label>
                  </div>
                </div>

                {isSecured === 'yes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-4 bg-[#faf8f5] rounded-lg border border-[#e8e0d4]">
                    <div>
                      <label className={labelClass}>نوع الضمان</label>
                      <select value={securityType} onChange={e => setSecurityType(e.target.value)} className={inputClass}>
                        <option value="">اختر...</option>
                        <option value="رهن عقاري">رهن عقاري</option>
                        <option value="رهن منقول">رهن منقول (معدات، مركبات)</option>
                        <option value="كفالة بنكية">كفالة بنكية</option>
                        <option value="كفالة شخصية">كفالة شخصية</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>قيمة الضمان (ريال)</label>
                      <input type="number" value={securityValue} onChange={e => setSecurityValue(e.target.value)} className={inputClass} dir="ltr" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className={labelClass}>تاريخ نشوء الدين</label>
                    <input type="date" value={debtOriginDate} onChange={e => setDebtOriginDate(e.target.value)} className={inputClass} dir="ltr" />
                  </div>
                  <div>
                    <label className={labelClass}>تاريخ الاستحقاق</label>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputClass} dir="ltr" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>مستند الاستحقاق</label>
                    <input type="text" value={dueDocument} onChange={e => setDueDocument(e.target.value)} placeholder="مثال: فاتورة رقم 2024-478، شيك رقم 123456" className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>سبب المطالبة *</label>
                    <textarea value={claimReason} onChange={e => setClaimReason(e.target.value)} rows={4} placeholder="اشرح سبب المطالبة بالتفصيل" className={inputClass} required />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Documents & Signature */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">المستندات والتوقيع</h2>

                <div className="space-y-4 mb-8">
                  {[
                    { key: 'creditor_id', label: 'نسخة من هوية الدائن أو السجل التجاري' },
                    { key: 'applicant_id', label: 'نسخة من هوية مقدم الطلب' },
                    { key: 'capacity_document', label: 'نسخة من سند الصفة بتقديم المطالبة' },
                    { key: 'power_of_attorney', label: 'نسخة من الوكالة أو عقد التأسيس (إن وجدت)' },
                    { key: 'opening_document', label: 'نسخة من سند الافتتاح' },
                    { key: 'due_document', label: 'نسخة من سند الاستحقاق' },
                    { key: 'security_document', label: 'نسخة من سند الضمان (إن وجدت)' },
                  ].map(doc => (
                    <div key={doc.key} className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e0d4]">
                      <Upload className="w-5 h-5 text-[#c9a227] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1e3a5f] font-medium">{doc.label}</p>
                        {files[doc.key] && (
                          <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {files[doc.key].file.name}
                          </p>
                        )}
                      </div>
                      <label className="px-3 py-1.5 bg-white border border-[#c9a227] text-[#c9a227] rounded text-xs font-medium cursor-pointer hover:bg-[#c9a227] hover:text-white transition-colors">
                        اختيار ملف
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => handleFileChange(doc.key, doc.label, e)} />
                      </label>
                    </div>
                  ))}
                </div>

                {/* Signature */}
                <div className="mb-6">
                  <label className={labelClass}>التوقيع *</label>
                  <div className="border-2 border-dashed border-[#e8e0d4] rounded-lg p-1 bg-white">
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
                  <button type="button" onClick={clearSignature} className="mt-2 text-xs text-red-500 hover:underline">مسح التوقيع</button>
                </div>

                {/* Declaration */}
                <label className="flex items-start gap-3 p-4 bg-[#1e3a5f]/5 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} className="mt-1 accent-[#c9a227] w-4 h-4" />
                  <span className="text-sm text-[#1e3a5f]">
                    أقر بأن جميع البيانات المدخلة صحيحة ودقيقة، وأتحمل المسؤولية الكاملة عن صحتها وفقاً لأحكام نظام الإفلاس ولائحته التنفيذية.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-5 md:mt-6 gap-3">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="px-4 md:px-6 py-2.5 md:py-3 text-sm border border-[#1e3a5f] text-[#1e3a5f] rounded-lg hover:bg-[#1e3a5f] hover:text-white active:scale-[0.97] transition-all">
                  السابق
                </button>
              ) : (
                <div />
              )}
              {currentStep < 3 ? (
                <button onClick={nextStep} className="px-6 md:px-8 py-2.5 md:py-3 text-sm bg-[#c9a227] text-white rounded-lg hover:bg-[#b08d1f] active:scale-[0.97] transition-all font-medium">
                  التالي
                </button>
              ) : (
                <button onClick={nextStep} disabled={submitting} className="px-6 md:px-8 py-2.5 md:py-3 text-sm bg-[#c9a227] text-white rounded-lg hover:bg-[#b08d1f] active:scale-[0.97] transition-all font-medium disabled:opacity-50">
                  <FileText className="w-4 h-4 inline ml-2" />
                  {submitting ? 'جاري إرسال المطالبة...' : 'تأكيد وإرسال المطالبة'}
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
