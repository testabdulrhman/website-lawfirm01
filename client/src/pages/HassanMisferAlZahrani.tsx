import { useEffect } from "react";

export default function HassanMisferAlZahrani() {
  useEffect(() => {
    document.title = "التصويت على مقترح إعادة التنظيم المالي | شركة حسن مسفر الزهراني وشركاه";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      {/* Document Container */}
      <div className="max-w-[900px] mx-auto bg-white shadow-lg my-8 print:my-0 print:shadow-none">
        
        {/* Page 1 */}
        <div className="px-12 py-8">
          {/* Header */}
          <header className="flex items-start justify-between border-b-2 border-[var(--color-navy)] pb-6 mb-8">
            <div className="text-sm text-gray-600">
              <p>12/02/1448هـ</p>
              <p>26/07/2026م</p>
            </div>
            <div className="text-center">
              {/* Logo placeholder - using text */}
              <div className="flex flex-col items-center gap-1">
                <img src="/images/brand/logo-dark.webp" alt="شعار الشركة" className="w-16 h-16 object-contain" />
                <p className="font-display font-bold text-lg text-[var(--color-navy)]">شركة</p>
                <p className="font-display font-bold text-lg text-[var(--color-navy)]">عبدالرحمن بن رضوان المشيقح</p>
                <p className="font-display text-sm text-[var(--color-navy)]">للمحاماة وإدارة إجراءات الإفلاس</p>
              </div>
            </div>
          </header>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8">
            {/* Arabic Column (Right) */}
            <div className="text-right leading-relaxed text-[15px] text-gray-800 space-y-4">
              <p className="font-bold text-base">إعلان التصويت على مقترح إعادة التنظيم المالي</p>
              <p>شركة حسن مسفر الزهراني وشركاه (سجل تجاري رقم 2050001522).</p>
              <p>إلى: دائـــنـــي شـــركـــة حـــســـن مـــسفـــر الزهـــرانـــي وشـــركـــاه المحترمين</p>
              <p>السلام عليكم ورحمة الله وبركاته، وبعد:</p>
              <p>يسر أمين إجراء إعادة التنظيم المالي لشركة حسن مسفر الزهراني وشركاه دعوتكم إلى التصويت على مقترح إعادة التنظيم المالي، وذلك وفق المواعيد والإجراءات الآتية:</p>

              <p className="font-bold mt-6">أولاً: موعد التصويت واجتماع الدائنين</p>
              
              <table className="w-full text-sm border-collapse mt-2">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold w-1/3">اليوم:</td>
                    <td className="py-2">الأحد</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold">التاريخ الهجري:</td>
                    <td className="py-2">03/03/1448هـ</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold">التاريخ الميلادي:</td>
                    <td className="py-2">16/08/2026م</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">فترة التصويت:</td>
                    <td className="py-2">من الساعة 1:00 مساءً حتى الساعة 3:00 مساءً</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-4">يتم التصويت إلكترونياً من خلال الرابط المخصص للتصويت، وذلك باختيار الموافقة أو عدم الموافقة على مقترح إعادة التنظيم المالي.</p>
              
              <table className="w-full text-sm border-collapse mt-2">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold w-1/3">رابط التصويت:</td>
                    <td className="py-2 text-gray-400">...............................</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-4">ويعقد أمين إجراء إعادة التنظيم المالي، بالتزامن مع فترة التصويت، اجتماعاً إلكترونياً للدائنين.</p>

              <table className="w-full text-sm border-collapse mt-2">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold w-1/3">رابط الاجتماع:</td>
                    <td className="py-2 text-gray-400">...............................</td>
                  </tr>
                </tbody>
              </table>

              <p className="font-bold mt-6">أجندة الاجتماع</p>
              <ul className="space-y-2 text-sm mt-2">
                <li>• الترحيب بالحضور، من الساعة 12:30 حتى الساعة 1:00م</li>
                <li>• كلمة افتتاحية من الأطراف ذات الصلة بالإجراء، من الساعة 1:00 حتى الساعة 1:15م</li>
                <li>• عرض عن سير إجراء إعادة التنظيم المالي، من الساعة 1:15 حتى الساعة 1:30م</li>
                <li>• استعراض مقترح إعادة التنظيم المالي، من الساعة 1:30 حتى الساعة 1:45م</li>
                <li>• الإجابة عن استفسارات الدائنين المتعلقة بالمقترح، من الساعة 1:45 حتى الساعة 2:15م</li>
                <li>• استمرار استقبال أصوات الدائنين عبر الرابط المخصص للتصويت حتى الساعة 3:00م</li>
                <li>• إغلاق باب التصويت وفرز الأصوات وإعلان النتيجة، من الساعة 3:00 حتى الساعة 4:30م، وقد يستغرق ذلك وقتاً أطول.</li>
              </ul>

              <p className="font-bold mt-6">ثانياً: مقترح إعادة التنظيم المالي</p>
              <p>يرفق مقترح إعادة التنظيم المالي بهذا الإعلان، لتمكين الدائنين من الاطلاع عليه قبل موعد التصويت، كما يتضمن الإعلان تفاصيل التصويت وروابط الدخول.</p>

              <p className="font-bold mt-6">ثالثاً: إعلان نتيجة التصويت</p>
              <p>سيتم إعلان نتيجة التصويت بعد انتهاء فترة التصويت واستكمال الإجراءات النظامية، وسيُشعر الدائنون بها عبر وسائل التواصل المعتمدة.</p>

              <p className="font-bold mt-6">تعليمات مهمة</p>
              <ul className="space-y-3 text-sm mt-2">
                <li>• يجب تقديم المستندات المؤيدة للصفة، بما في ذلك الهوية، والوكالة أو التفويض الساري المفعول، بحسب الأحوال، إلى أمين الإجراء قبل موعد التصويت بيومين على الأقل، للتحقق منها واعتماد مشاركة المصوت.</li>
                <li>• يقتصر الاطلاع على المقترح والتصويت على الأشخاص المخولين بذلك، ويحظر تداول المقترح أو نسخه أو نشره بأي وسيلة، إلا وفقاً للأنظمة والتعليمات ذات العلاقة.</li>
                <li>• يتعين الدخول إلى رابط التصويت باستخدام البيانات والتعليمات الواردة في هذا الإعلان، واستكمال المتطلبات اللازمة قبل إبداء التصويت.</li>
                <li>• في حال مواجهة أي مشكلة تقنية، يمكن التواصل مع فريق الدعم الفني عبر البريد الإلكتروني والواتساب.</li>
              </ul>

              <div className="mt-6 p-4 border-2 border-gray-800 rounded">
                <p className="font-bold mb-2">تنبيه</p>
                <ul className="space-y-2 text-sm">
                  <li>• يتم التصويت حصرياً من خلال الرابط الإلكتروني المخصص للتصويت، ولا يتم التصويت من خلال الاجتماع الإلكتروني.</li>
                  <li>• يقتصر التصويت على الفترة المحددة أعلاه، ولن يُقبل أي تصويت يرد بعد إغلاق الرابط عند الساعة 3:00 مساءً.</li>
                  <li>• يوصى بمراجعة المقترح المرفق، والتحقق من صلاحية رابط التصويت، واستكمال الوكالات أو التفويضات والمتطلبات اللازمة قبل الموعد المحدد بوقت كافٍ.</li>
                </ul>
              </div>
            </div>

            {/* English Column (Left) */}
            <div className="text-left leading-relaxed text-[13px] text-gray-600 space-y-4" dir="ltr">
              <p className="font-bold text-sm">Notice of Voting on the Financial Reorganization Proposal</p>
              <p>Hassan Misfer Al-Zahrani & Partners Company Commercial Registration No. (2050001522).</p>
              <p>To: The Creditors of Hassan Misfer Al-Zahrani & Partners Company</p>
              <p className="mt-4">The Financial Reorganization Procedure Trustee of Hassan Misfer Al-Zahrani & Partners Company is pleased to invite you to vote on the Financial Reorganization Proposal, in accordance with the following dates and procedures:</p>

              <p className="font-bold mt-4 text-sm">First: Voting Schedule and Creditors' Meeting</p>
              <table className="w-full text-xs border-collapse mt-2">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-1 font-semibold">Day:</td>
                    <td className="py-1">Sunday</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-1 font-semibold">Hijri Date:</td>
                    <td className="py-1">03/03/1448 AH</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-1 font-semibold">Gregorian Date:</td>
                    <td className="py-1">16/08/2026</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Voting Period:</td>
                    <td className="py-1">From 1:00 PM to 3:00 PM.</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-3">Voting shall be conducted electronically through the designated voting link by selecting either approval or rejection of the Financial Reorganization Proposal.</p>

              <table className="w-full text-xs border-collapse mt-2">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-1 font-semibold">Voting Link:</td>
                    <td className="py-1 text-gray-400">...............................</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-3">Concurrently with the voting period, the Financial Reorganization Procedure Trustee will hold an electronic meeting for the creditors.</p>

              <table className="w-full text-xs border-collapse mt-2">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-1 font-semibold">Meeting Link:</td>
                    <td className="py-1 text-gray-400">...............................</td>
                  </tr>
                </tbody>
              </table>

              <p className="font-bold mt-4 text-sm">Meeting Agenda</p>
              <ul className="space-y-1 text-xs mt-2">
                <li>• Welcoming the attendees, from 12:30 PM until 1:00 PM.</li>
                <li>• Opening remarks by parties related to the procedure, from 1:00 until 1:15 PM.</li>
                <li>• An overview of the progress of the Financial Reorganization Procedure, from 1:15 PM until 1:30 PM.</li>
                <li>• Presentation of the Financial Reorganization Proposal, from 1:30 PM until 1:45 PM.</li>
                <li>• Responding to creditors' inquiries relating to the Proposal, from 1:45 PM until 2:15 PM.</li>
                <li>• Continued receipt of creditors' votes through the designated voting link until 3:00 PM.</li>
                <li>• Closing the voting period, counting the votes, and announcing the voting result, from 3:00 PM until 4:30 PM. This process may take longer.</li>
              </ul>

              <p className="font-bold mt-4 text-sm">Second: Financial Reorganization Proposal</p>
              <p>The Financial Reorganization Proposal is attached for creditors' review, together with the voting details and access links.</p>

              <p className="font-bold mt-4 text-sm">Third: Announcement of the Voting Result</p>
              <p>The voting result will be announced after the voting period has ended and the statutory procedures have been completed. Creditors will be notified of the result through the approved communication channels.</p>

              <p className="font-bold mt-4 text-sm">Important Instructions</p>
              <ul className="space-y-2 text-xs mt-2">
                <li>• Documents evidencing the voter's capacity and authority, including an identification document and, where applicable, a valid power of attorney or authorization, must be submitted to the Procedure Trustee at <strong>least two days before the voting date</strong> for verification and approval of the voter's participation.</li>
                <li>• Access to the Proposal and voting shall be restricted to persons duly authorized by law. The Proposal may not be circulated, copied, or published by any means except in accordance with the applicable laws and relevant instructions.</li>
                <li>• Voters must access the voting link using the information and instructions set out in this announcement and complete all necessary requirements before casting their votes.</li>
                <li>• In the event of any technical issue, the technical support team may be contacted via WhatsApp.</li>
              </ul>

              <div className="mt-4 p-3 border-2 border-gray-600 rounded">
                <p className="font-bold mb-2 text-sm">Notice</p>
                <ul className="space-y-1 text-xs">
                  <li>• Voting shall be conducted exclusively through the designated electronic voting link and shall not take place through the electronic meeting.</li>
                  <li>• Voting shall be limited to the period specified above, and <strong>no vote submitted after the voting link closes at 3:00 PM will be accepted.</strong></li>
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
              <div className="flex items-center gap-4">
                <span>📍 الرياض - الحائري الشمالي - مجمع روبين بلازا</span>
              </div>
              <div className="flex items-center gap-4">
                <span>📍 القصيم - بريدة - طريق الملك عبدالله</span>
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
