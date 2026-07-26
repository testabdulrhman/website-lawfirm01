import { useEffect } from "react";

export default function HassanMisferAlZahrani() {
  useEffect(() => {
    document.title = "التصويت على مقترح إعادة التنظيم المالي | شركة حسن مسفر الزهراني وشركاه";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-[950px] mx-auto bg-white shadow-lg my-8 print:my-0 print:shadow-none">
        <div className="px-10 py-8">
          {/* Date */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
            <div className="text-sm text-gray-600">
              <p>12/02/1448هـ</p>
              <p>26/07/2026م</p>
            </div>
          </div>

          {/* Row-by-row bilingual content */}
          <div className="space-y-0">
            {/* Title */}
            <Row
              ar={<span className="font-bold text-base">إعلان التصويت على مقترح إعادة التنظيم المالي</span>}
              en={<span className="font-bold text-sm">Notice of Voting on the Financial Reorganization Proposal</span>}
            />
            <Row
              ar="شركة حسن مسفر الزهراني وشركاه (سجل تجاري رقم 2050001522)."
              en="Hassan Misfer Al-Zahrani & Partners Company Commercial Registration No. (2050001522)."
            />
            <Row
              ar="إلى: دائـنـي شـركـة حـسـن مـسفـر الزهـرانـي وشـركـاه المحترمين"
              en="To: The Creditors of Hassan Misfer Al-Zahrani & Partners Company"
            />
            <Row
              ar="السلام عليكم ورحمة الله وبركاته، وبعد:"
              en=""
            />
            <Row
              ar="يسر أمين إجراء إعادة التنظيم المالي لشركة حسن مسفر الزهراني وشركاه دعوتكم إلى التصويت على مقترح إعادة التنظيم المالي، وذلك وفق المواعيد والإجراءات الآتية:"
              en="The Financial Reorganization Procedure Trustee of Hassan Misfer Al-Zahrani & Partners Company is pleased to invite you to vote on the Financial Reorganization Proposal, in accordance with the following dates and procedures:"
            />

            {/* Section 1 */}
            <Row
              ar={<span className="font-bold text-base mt-4 block">أولاً: موعد التصويت واجتماع الدائنين</span>}
              en={<span className="font-bold text-sm mt-4 block">First: Voting Schedule and Creditors' Meeting</span>}
            />
            <Row
              ar="اليوم: الأحد"
              en="Day: Sunday"
            />
            <Row
              ar="التاريخ الهجري: 03/03/1448هـ"
              en="Hijri Date: 03/03/1448 AH"
            />
            <Row
              ar="التاريخ الميلادي: 16/08/2026م"
              en="Gregorian Date: 16/08/2026"
            />
            <Row
              ar="فترة التصويت: من الساعة 1:00 مساءً حتى الساعة 3:00 مساءً"
              en="Voting Period: From 1:00 PM to 3:00 PM."
            />
            <Row
              ar="يتم التصويت إلكترونياً من خلال الرابط المخصص للتصويت، وذلك باختيار الموافقة أو عدم الموافقة على مقترح إعادة التنظيم المالي."
              en="Voting shall be conducted electronically through the designated voting link by selecting either approval or rejection of the Financial Reorganization Proposal."
            />
            <Row
              ar="رابط التصويت: ..............................."
              en="Voting Link: ..............................."
            />
            <Row
              ar="ويعقد أمين إجراء إعادة التنظيم المالي، بالتزامن مع فترة التصويت، اجتماعاً إلكترونياً للدائنين."
              en="Concurrently with the voting period, the Financial Reorganization Procedure Trustee will hold an electronic meeting for the creditors."
            />
            <Row
              ar="رابط الاجتماع: ..............................."
              en="Meeting Link: ..............................."
            />

            {/* Agenda */}
            <Row
              ar={<span className="font-bold text-base mt-4 block">أجندة الاجتماع</span>}
              en={<span className="font-bold text-sm mt-4 block">Meeting Agenda</span>}
            />
            <Row
              ar="• الترحيب بالحضور، من الساعة 12:30 حتى الساعة 1:00م"
              en="• Welcoming the attendees, from 12:30 PM until 1:00 PM."
            />
            <Row
              ar="• كلمة افتتاحية من الأطراف ذات الصلة بالإجراء، من الساعة 1:00 حتى الساعة 1:15م"
              en="• Opening remarks by parties related to the procedure, from 1:00 until 1:15 PM."
            />
            <Row
              ar="• عرض عن سير إجراء إعادة التنظيم المالي، من الساعة 1:15 حتى الساعة 1:30م"
              en="• An overview of the progress of the Financial Reorganization Procedure, from 1:15 PM until 1:30 PM."
            />
            <Row
              ar="• استعراض مقترح إعادة التنظيم المالي، من الساعة 1:30 حتى الساعة 1:45م"
              en="• Presentation of the Financial Reorganization Proposal, from 1:30 PM until 1:45 PM."
            />
            <Row
              ar="• الإجابة عن استفسارات الدائنين المتعلقة بالمقترح، من الساعة 1:45 حتى الساعة 2:15م"
              en="• Responding to creditors' inquiries relating to the Proposal, from 1:45 PM until 2:15 PM."
            />
            <Row
              ar="• استمرار استقبال أصوات الدائنين عبر الرابط المخصص للتصويت حتى الساعة 3:00م"
              en="• Continued receipt of creditors' votes through the designated voting link until 3:00 PM."
            />
            <Row
              ar="• إغلاق باب التصويت وفرز الأصوات وإعلان النتيجة، من الساعة 3:00 حتى الساعة 4:30م، وقد يستغرق ذلك وقتاً أطول."
              en="• Closing the voting period, counting the votes, and announcing the voting result, from 3:00 PM until 4:30 PM. This process may take longer."
            />

            {/* Section 2 */}
            <Row
              ar={<span className="font-bold text-base mt-4 block">ثانياً: مقترح إعادة التنظيم المالي</span>}
              en={<span className="font-bold text-sm mt-4 block">Second: Financial Reorganization Proposal</span>}
            />
            <Row
              ar="يرفق مقترح إعادة التنظيم المالي بهذا الإعلان، لتمكين الدائنين من الاطلاع عليه قبل موعد التصويت، كما يتضمن الإعلان تفاصيل التصويت وروابط الدخول."
              en="The Financial Reorganization Proposal is attached for creditors' review, together with the voting details and access links."
            />

            {/* Section 3 */}
            <Row
              ar={<span className="font-bold text-base mt-4 block">ثالثاً: إعلان نتيجة التصويت</span>}
              en={<span className="font-bold text-sm mt-4 block">Third: Announcement of the Voting Result</span>}
            />
            <Row
              ar="سيتم إعلان نتيجة التصويت بعد انتهاء فترة التصويت واستكمال الإجراءات النظامية، وسيُشعر الدائنون بها عبر وسائل التواصل المعتمدة."
              en="The voting result will be announced after the voting period has ended and the statutory procedures have been completed. Creditors will be notified of the result through the approved communication channels."
            />

            {/* Important Instructions */}
            <Row
              ar={<span className="font-bold text-base mt-4 block">تعليمات مهمة</span>}
              en={<span className="font-bold text-sm mt-4 block">Important Instructions</span>}
            />
            <Row
              ar="• يجب تقديم المستندات المؤيدة للصفة، بما في ذلك الهوية، والوكالة أو التفويض الساري المفعول، بحسب الأحوال، إلى أمين الإجراء قبل موعد التصويت بيومين على الأقل، للتحقق منها واعتماد مشاركة المصوت."
              en="• Documents evidencing the voter's capacity and authority, including an identification document and, where applicable, a valid power of attorney or authorization, must be submitted to the Procedure Trustee at least two days before the voting date for verification and approval of the voter's participation."
            />
            <Row
              ar="• يقتصر الاطلاع على المقترح والتصويت على الأشخاص المخولين بذلك، ويحظر تداول المقترح أو نسخه أو نشره بأي وسيلة، إلا وفقاً للأنظمة والتعليمات ذات العلاقة."
              en="• Access to the Proposal and voting shall be restricted to persons duly authorized by law. The Proposal may not be circulated, copied, or published by any means except in accordance with the applicable laws and relevant instructions."
            />
            <Row
              ar="• يتعين الدخول إلى رابط التصويت باستخدام البيانات والتعليمات الواردة في هذا الإعلان، واستكمال المتطلبات اللازمة قبل إبداء التصويت."
              en="• Voters must access the voting link using the information and instructions set out in this announcement and complete all necessary requirements before casting their votes."
            />
            <Row
              ar="• في حال مواجهة أي مشكلة تقنية، يمكن التواصل مع فريق الدعم الفني عبر البريد الإلكتروني والواتساب."
              en="• In the event of any technical issue, the technical support team may be contacted via email and WhatsApp."
            />

            {/* Notice Box */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-gray-800 rounded p-4 text-right" dir="rtl">
                <p className="font-bold mb-3 text-base">تنبيه</p>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-800">
                  <li>• يتم التصويت حصرياً من خلال الرابط الإلكتروني المخصص للتصويت، ولا يتم التصويت من خلال الاجتماع الإلكتروني.</li>
                  <li>• يقتصر التصويت على الفترة المحددة أعلاه، ولن يُقبل أي تصويت يرد بعد إغلاق الرابط عند الساعة 3:00 مساءً.</li>
                  <li>• يوصى بمراجعة المقترح المرفق، والتحقق من صلاحية رابط التصويت، واستكمال الوكالات أو التفويضات والمتطلبات اللازمة قبل الموعد المحدد بوقت كافٍ.</li>
                </ul>
              </div>
              <div className="border-2 border-gray-600 rounded p-4 text-left" dir="ltr">
                <p className="font-bold mb-3 text-sm">Notice</p>
                <ul className="space-y-2 text-xs leading-relaxed text-gray-600">
                  <li>• Voting shall be conducted exclusively through the designated electronic voting link and shall not take place through the electronic meeting.</li>
                  <li>• Voting shall be limited to the period specified above, and no vote submitted after the voting link closes at 3:00 PM will be accepted.</li>
                  <li>• Creditors are advised to review the attached Proposal, verify the validity of the voting link, and complete all required powers of attorney, authorizations, and other requirements sufficiently in advance of the specified date and time.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Signature & Contact */}
          <div className="mt-12 pt-8 border-t-2 border-[var(--color-navy)]">
            <div className="text-center mb-6">
              <p className="text-gray-700">شاكرين ومقدرين تعاونكم.</p>
              <p className="text-gray-500 text-sm mt-1">Thank you for your cooperation</p>
            </div>

            <table className="w-full text-sm border-collapse mb-8">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-right w-1/3">بريد إلكتروني</td>
                  <td className="py-2 text-center">bankruptcy@redwan.sa</td>
                  <td className="py-2 font-semibold text-left w-1/3" dir="ltr">Email</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-right">رابط اجتماع التصويت</td>
                  <td className="py-2 text-center text-gray-400">...............................</td>
                  <td className="py-2 font-semibold text-left" dir="ltr">Voting Meeting Link</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-right">رابط التصويت الإلكتروني</td>
                  <td className="py-2 text-center text-gray-400">...............................</td>
                  <td className="py-2 font-semibold text-left" dir="ltr">Voting Link</td>
                </tr>
              </tbody>
            </table>

            <p className="text-center font-display font-bold text-lg text-[var(--color-navy)]">
              أمين إجراء إعادة التنظيم المالي / عبدالرحمن بن رضوان المشيقح
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t-2 border-[var(--color-navy)]">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>الرياض - الحائري الشمالي - مجمع روبين بلازا</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>القصيم - بريدة - طريق الملك عبدالله</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-600">
              <span>info@redwan.sa</span>
              <span>920014616</span>
              <span>www.redwan.com</span>
              <span>0505483828</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

/* Row component for aligned bilingual content */
function Row({ ar, en }: { ar: React.ReactNode; en: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-6 py-2 border-b border-gray-100">
      <div className="text-right text-[15px] leading-relaxed text-gray-800" dir="rtl">
        {ar}
      </div>
      <div className="text-left text-[13px] leading-relaxed text-gray-600" dir="ltr">
        {en}
      </div>
    </div>
  );
}
