// ============================================================
// قراءة مبلغٍ يكتبه الدائن بيده
// ------------------------------------------------------------
// كانت خانة المبلغ type="number" تُقرأ بـ parseFloat، فمن كتب 43,000
// حُفظت مطالبته 43 ريالاً، ومن كتب 472.848 حُفظت 472.848 (أكتوبر 2026:
// سبع مطالبات). فصار المبلغ يُقرأ هنا: الأرقام العربية، وفاصل الآلاف
// فاصلةً كان أو نقطة، والريال لا يتجزأ إلا إلى هللتين — فثلاث خانات
// بعد الفاصل آلافٌ لا كسور.
//
// نسخةٌ من crm-iflas (src/lib/amount.ts، وفيه اختباراته)، ومنه في
// apply-completion؛ فمن عدّل هنا عدّل هناك.
// ============================================================

const DIGITS: Record<string, string> = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
};

/** فاصلٌ واحد: آلافٌ إن تكرّر أو تلته ثلاث خانات، وإلا فكسر */
function oneSeparator(s: string, sep: string): string {
  const parts = s.split(sep);
  if (parts.length > 2 || parts[1].length === 3) return parts.join('');
  return parts.join('.');
}

/** المبلغ رقماً بهللتين على الأكثر، أو null إن لم يُفهم */
export function parseAmount(input: unknown): number | null {
  if (typeof input === 'number') return Number.isFinite(input) ? Math.round(input * 100) / 100 : null;
  if (typeof input !== 'string') return null;

  let s = input
    .trim()
    .replace(/[٠-٩۰-۹]/g, (d) => DIGITS[d])
    .replace(/٫/g, '.')
    .replace(/[٬،]/g, ',')
    .replace(/ريال|ر\.?\s?س|SAR|﷼/gi, '')
    .replace(/[\s ‏‎']/g, '');
  if (!s) return null;

  const hasComma = s.includes(',');
  const hasDot = s.includes('.');
  if (hasComma && hasDot) {
    // كلاهما: الأخير هو الكسر، والآخر فاصل آلاف
    const dec = s.lastIndexOf(',') > s.lastIndexOf('.') ? ',' : '.';
    const thou = dec === ',' ? '.' : ',';
    s = s.split(thou).join('');
    s = oneSeparator(s, dec);
  } else if (hasComma) {
    s = oneSeparator(s, ',');
  } else if (hasDot) {
    s = oneSeparator(s, '.');
  }

  if (!/^\d+(\.\d{1,2})?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** المبلغ كما فُهم — يُعرض للدائن تحت الخانة قبل الإرسال */
export function formatAmountPreview(n: number): string {
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ريال`;
}
