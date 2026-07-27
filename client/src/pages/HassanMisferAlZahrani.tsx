import { useEffect, useState, useCallback } from "react";
import { trackEmailClick, trackProposalDownload } from "@/lib/analytics";

// Voting date: Sunday 16/08/2026 at 1:00 PM (Saudi time UTC+3)
const VOTING_START = new Date('2026-08-16T10:00:00Z'); // 1:00 PM Saudi
const VOTING_END = new Date('2026-08-16T12:00:00Z'); // 3:00 PM Saudi
const VOTING_LINK = ''; // TODO: Add actual voting link
const MEETING_LINK = ''; // TODO: Add actual meeting link

export default function HassanMisferAlZahrani() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    document.title = "التصويت على مقترح إعادة التنظيم المالي | شركة حسن مسفر الزهراني وشركاه";
    window.scrollTo(0, 0);
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown logic
  const getCountdown = useCallback(() => {
    const diff = VOTING_START.getTime() - now.getTime();
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }, [now]);

  const countdown = getCountdown();

  const handleProposalClick = () => {
    trackProposalDownload('Hassan-Misfer-Al-Zahrani');
  };

  const isVotingOpen = now >= VOTING_START && now <= VOTING_END;
  const isVotingEnded = now > VOTING_END;

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      {/* Countdown Banner */}
      {!isVotingEnded && (
        <div className="sticky top-[72px] z-40 bg-gradient-to-l from-[var(--color-navy)] to-[#1a365d] text-white py-4 px-4 shadow-lg">
          <div className="max-w-[950px] mx-auto">
            {countdown ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium opacity-90">الوقت المتبقي لبدء التصويت / Time remaining until voting starts</p>
                <div className="flex items-center gap-3 sm:gap-5" dir="ltr">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold tabular-nums">{String(countdown.days).padStart(2, '0')}</span>
                    <span className="text-[10px] opacity-75">يوم</span>
                  </div>
                  <span className="text-xl font-bold opacity-50">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold tabular-nums">{String(countdown.hours).padStart(2, '0')}</span>
                    <span className="text-[10px] opacity-75">ساعة</span>
                  </div>
                  <span className="text-xl font-bold opacity-50">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold tabular-nums">{String(countdown.minutes).padStart(2, '0')}</span>
                    <span className="text-[10px] opacity-75">دقيقة</span>
                  </div>
                  <span className="text-xl font-bold opacity-50">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold tabular-nums">{String(countdown.seconds).padStart(2, '0')}</span>
                    <span className="text-[10px] opacity-75">ثانية</span>
                  </div>
                </div>
                {/* Calendar Buttons */}
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=%D8%A7%D9%84%D8%AA%D8%B5%D9%88%D9%8A%D8%AA+%D8%B9%D9%84%D9%89+%D9%85%D9%82%D8%AA%D8%B1%D8%AD+%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85+%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A&dates=20260816T100000Z/20260816T120000Z&details=%D8%A7%D9%84%D8%AA%D8%B5%D9%88%D9%8A%D8%AA+%D8%B9%D9%84%D9%89+%D9%85%D9%82%D8%AA%D8%B1%D8%AD+%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85+%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A+%D9%84%D8%B4%D8%B1%D9%83%D8%A9+%D8%AD%D8%B3%D9%86+%D9%85%D8%B3%D9%81%D8%B1+%D8%A7%D9%84%D8%B2%D9%87%D8%B1%D8%A7%D9%86%D9%8A+%D9%88%D8%B4%D8%B1%D9%83%D8%A7%D9%87%0A%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B7%3A+https%3A%2F%2Fredwan.sa%2Fbankruptcy%2FHassan-Misfer-Al-Zahrani&location=%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9+%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-md text-xs font-medium transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 22h-15A2.5 2.5 0 012 19.5v-15A2.5 2.5 0 014.5 2H6v1.5a.5.5 0 001 0V2h10v1.5a.5.5 0 001 0V2h1.5A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5zM4.5 3.5A1 1 0 003.5 4.5v15a1 1 0 001 1h15a1 1 0 001-1v-15a1 1 0 00-1-1H18v.5a.5.5 0 01-1 0V3.5H7v.5a.5.5 0 01-1 0V3.5H4.5zM20 8H4v-.5h16V8z"/></svg>
                    Google Calendar
                  </a>
                  <a
                    href="/voting-event.ics"
                    download="voting-event.ics"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-md text-xs font-medium transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2a1 1 0 011 1v1h2a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2V3a1 1 0 112 0v1h8V3a1 1 0 011-1zM4 10v10h16V10H4zm2 2h3v3H6v-3z"/></svg>
                    Apple Calendar
                  </a>
                </div>
              </div>
            ) : isVotingOpen ? (
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                <p className="text-base font-bold">التصويت مفتوح الآن / Voting is open now</p>
              </div>
            ) : null}
          </div>
        </div>
      )}

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
            {/* Voting Button - Auto-activates on voting date */}
            <div className="grid grid-cols-2 gap-6 py-4 border-b border-gray-100">
              <div className="text-right" dir="rtl">
                {isVotingOpen && VOTING_LINK ? (
                  <a href={VOTING_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    التصويت الآن
                  </a>
                ) : (
                  <button disabled className="w-full py-3 px-6 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-bold text-base flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    رابط التصويت
                  </button>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {isVotingEnded ? 'انتهت فترة التصويت' : isVotingOpen ? 'التصويت مفتوح الآن' : 'سيتوفر الرابط يوم الأحد 03/03/1448هـ (16/08/2026م) الساعة 1:00 مساءً'}
                </p>
              </div>
              <div className="text-left" dir="ltr">
                {isVotingOpen && VOTING_LINK ? (
                  <a href={VOTING_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Vote Now
                  </a>
                ) : (
                  <button disabled className="w-full py-3 px-6 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-bold text-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Voting Link
                  </button>
                )}
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {isVotingEnded ? 'Voting period has ended' : isVotingOpen ? 'Voting is now open' : 'Available on Sunday 03/03/1448 AH (16/08/2026) at 1:00 PM'}
                </p>
              </div>
            </div>
            <Row
              ar="ويعقد أمين إجراء إعادة التنظيم المالي، بالتزامن مع فترة التصويت، اجتماعاً إلكترونياً للدائنين."
              en="Concurrently with the voting period, the Financial Reorganization Procedure Trustee will hold an electronic meeting for the creditors."
            />
            {/* Meeting Button - Auto-activates on voting date */}
            <div className="grid grid-cols-2 gap-6 py-4 border-b border-gray-100">
              <div className="text-right" dir="rtl">
                {isVotingOpen && MEETING_LINK ? (
                  <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    دخول الاجتماع
                  </a>
                ) : (
                  <button disabled className="w-full py-3 px-6 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-bold text-base flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    رابط الاجتماع
                  </button>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {isVotingEnded ? 'انتهى الاجتماع' : isVotingOpen ? 'الاجتماع منعقد الآن' : 'سيتوفر الرابط يوم الأحد 03/03/1448هـ (16/08/2026م) الساعة 12:30 ظهراً'}
                </p>
              </div>
              <div className="text-left" dir="ltr">
                {isVotingOpen && MEETING_LINK ? (
                  <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Join Meeting
                  </a>
                ) : (
                  <button disabled className="w-full py-3 px-6 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-bold text-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Meeting Link
                  </button>
                )}
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {isVotingEnded ? 'Meeting has ended' : isVotingOpen ? 'Meeting is in progress' : 'Available on Sunday 03/03/1448 AH (16/08/2026) at 12:30 PM'}
                </p>
              </div>
            </div>

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

          {/* Proposal Download */}
          <div className="mt-8 py-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-right" dir="rtl">
                <a
                  href="/proposal.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleProposalClick}
                  className="w-full py-3 px-6 bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  الاطلاع على المقترح
                </a>
                <p className="text-xs text-gray-500 mt-2 text-center">مقترح إعادة التنظيم المالي (PDF)</p>
              </div>
              <div className="text-left" dir="ltr">
                <a
                  href="/proposal.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleProposalClick}
                  className="w-full py-3 px-6 bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  View Proposal
                </a>
                <p className="text-xs text-gray-400 mt-2 text-center">Financial Reorganization Proposal (PDF)</p>
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
                  <td className="py-2 text-center"><a href="mailto:bankruptcy@redwan.sa" onClick={() => trackEmailClick('bankruptcy_notice')} className="text-blue-700 hover:text-blue-900 underline">bankruptcy@redwan.sa</a></td>
                  <td className="py-2 font-semibold text-left w-1/3" dir="ltr">Email</td>
                </tr>
              </tbody>
            </table>

            <p className="text-center font-display font-bold text-lg text-[var(--color-navy)]">
              أمين إجراء إعادة التنظيم المالي / عبدالرحمن بن رضوان المشيقح
            </p>
          </div>

        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/966920032760?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85+%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C+%D9%84%D8%AF%D9%8A+%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1+%D8%A8%D8%AE%D8%B5%D9%88%D8%B5+%D8%A7%D9%84%D8%AA%D8%B5%D9%88%D9%8A%D8%AA+%D8%B9%D9%84%D9%89+%D9%85%D9%82%D8%AA%D8%B1%D8%AD+%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85+%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%0AHello%2C+I+have+an+inquiry+regarding+the+voting+on+the+Financial+Reorganization+Proposal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span className="text-sm font-bold">للاستفسارات</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
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
