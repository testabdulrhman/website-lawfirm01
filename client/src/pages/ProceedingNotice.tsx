/**
 * A trustee's notice, on its own page under its proceeding: the event card on top,
 * then the notice exactly as issued, Arabic and English side by side.
 * The links in the notice follow the clock: open before and during the event, closed after it.
 */
import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "@/pages/NotFound";
import {
  FIRM, TRACK, findProceeding, fmt, shortName, phaseOf, untilText, noticeSeo,
  type Proceeding, type ProceedingNotice as N, type NoticePhase,
} from "@/data/proceedings";
import { ProceedingsShell, useNow, Arrow, Crumb, ext } from "@/components/proceedings/shared";

export default function ProceedingNotice() {
  const [location] = useLocation();
  const [, , slug, sub] = decodeURIComponent(location.split(/[?#]/, 1)[0].replace(/\/+$/, "")).split("/");
  const p = findProceeding(slug);
  const n = p?.notices?.find(x => x.slug === sub);
  const now = useNow(30_000);
  const seo = p && n ? noticeSeo(p, n) : undefined;

  useSEO({
    title: seo?.title || "الإشعار غير موجود",
    description: seo?.description || "",
    canonical: p && n ? `/bankruptcy/${p.slug}/${n.slug}` : undefined,
    noindex: !p || !n,
    arabicOnly: true,
  });

  if (!p || !n) return <NotFound />;
  return <NoticePage p={p} n={n} now={now} />;
}

function NoticePage({ p, n, now }: { p: Proceeding; n: N; now: number }) {
  const ph = phaseOf(n, now);
  const meetingOn = now >= Date.parse(n.meetingAt);

  return (
    <ProceedingsShell>
      <section className="mast mast-sm">
        <div className="wrap">
          <Crumb trail={[
            { label: "إجراءات الإفلاس", href: "/bankruptcy" },
            { label: "الإجراءات القائمة", href: "/bankruptcy/proceedings" },
            { label: shortName(p.name), href: `/bankruptcy/${p.slug}` },
            { label: n.kind },
          ]} />
          <p className="eyebrow"><span>إشعار من {TRACK[p.track].role}</span><i></i><span className="d">صدر في {fmt(n.issued)}، {n.issuedH}</span></p>
          <h1>{n.title}</h1>
          <p className="sub-h" lang="en">{n.titleEn}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="status event">
          <div className="ev-date">
            <p className="label">موعد التصويت</p>
            <p className="ev-day">{n.dayAr} {fmt(n.date)}</p>
            <p className="ev-meta">{n.dateH} · من 1:00 إلى 3:00 مساءً · الاجتماع الإلكتروني من 12:30 ظهراً</p>
            {ph === "before" && <p className="ev-state">يبدأ التصويت بعد <b>{untilText(n.start, now)}</b></p>}
            {ph === "during" && <p className="ev-state live"><span></span>التصويت مفتوح الآن حتى 3:00 مساءً</p>}
            {ph === "after" && <p className="ev-state done">انتهت فترة التصويت</p>}
          </div>
          <div className="st-act">
            {ph === "after" ? (
              <p className="ev-after">النتيجة يُشعَر بها الدائنون عبر وسائل التواصل المعتمدة.</p>
            ) : (
              <>
                <a className="btn ink" href={FIRM.portal} {...ext}>{ph === "during" ? "التصويت الآن عبر بوابة الدائن" : "بوابة الدائن"} <Arrow /></a>
                <a className="btn ghost" href={n.meeting} {...ext}>رابط الاجتماع</a>
                {ph === "before" && (
                  <>
                    <a className="btn ghost" href={n.cal} {...ext}>Google Calendar</a>
                    <a className="btn ghost" href={n.ics} download>Apple Calendar</a>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <section className="wrap letter-wrap" aria-label="نص الإعلان">
        <article className="letter">
          {n.text.map((b, i) => <Block key={i} b={b} n={n} ph={ph} meetingOn={meetingOn} />)}
        </article>
      </section>
      <div className="wrap disc">
        <p>المرجع النهائي هو أحكام المحكمة المختصة، والإعلانات الرسمية للجنة الإفلاس، وبوابة الدائن. المعلومات المنشورة هنا لا تُعد استشارة قانونية.</p>
      </div>
    </ProceedingsShell>
  );
}

/* one row per block of the notice; the Arabic and English stand side by side as issued */
function Bi({ ar, en, cls = "" }: { ar: ReactNode; en?: ReactNode; cls?: string }) {
  return (
    <div className={`bi ${cls}`.trim()}>
      <div lang="ar" dir="rtl">{ar}</div>
      <div lang="en" dir="ltr">{en}</div>
    </div>
  );
}

function LinkRow({ href, ph, ar, en }: {
  href: string; ph: NoticePhase;
  ar: { btn: string; off: string; state: string };
  en: { btn: string; off: string; state: string };
}) {
  const one = (x: typeof ar) => (
    <>
      {ph === "after" ? <span className="lk off">{x.off}</span> : <a className="lk" href={href} {...ext}>{x.btn}</a>}
      <small>{x.state}</small>
    </>
  );
  return <Bi cls="links" ar={one(ar)} en={one(en)} />;
}

function Block({ b, n, ph, meetingOn }: { b: N["text"][number]; n: N; ph: NoticePhase; meetingOn: boolean }) {
  const [k] = b;
  if (b[0] === "caution") {
    return (
      <div className="caution">
        <Bi ar={<h4>{b[1]}</h4>} en={<h4>{b[2]}</h4>} />
        {b[3].map(([a, e], i) => <Bi key={i} ar={<p className="li">{a}</p>} en={<p className="li">{e}</p>} />)}
      </div>
    );
  }
  if (b[0] === "sign") return <p className="sign" dir="rtl">{b[1]}</p>;
  if (k === "votelink") {
    return (
      <LinkRow href={FIRM.portal} ph={ph}
        ar={{ btn: "فتح بوابة التصويت", off: "رابط التصويت",
          state: ph === "after" ? "انتهت فترة التصويت" : ph === "during" ? "التصويت مفتوح الآن" : "يمكن فتح بوابة الدائن وتجهيز الدخول مسبقاً؛ يبدأ التصويت يوم الأحد 16/08/2026م الساعة 1:00 مساءً" }}
        en={{ btn: "Open Creditor Portal", off: "Voting Link",
          state: ph === "after" ? "Voting period has ended" : ph === "during" ? "Voting is now open" : "You may open the Creditor Portal and prepare in advance; voting starts on Sunday, 16 August 2026 at 1:00 PM" }} />
    );
  }
  if (k === "meetlink") {
    return (
      <LinkRow href={n.meeting} ph={ph}
        ar={{ btn: "فتح رابط الاجتماع", off: "رابط الاجتماع",
          state: ph === "after" ? "انتهى الاجتماع" : meetingOn ? "الاجتماع منعقد الآن" : "يمكن فتح الرابط وتجهيز Microsoft Teams مسبقاً؛ يبدأ الاجتماع يوم الأحد 16/08/2026م الساعة 12:30 ظهراً" }}
        en={{ btn: "Open Meeting Link", off: "Meeting Link",
          state: ph === "after" ? "Meeting has ended" : meetingOn ? "Meeting is in progress" : "You may open the link and prepare Microsoft Teams in advance; the meeting starts on Sunday, 16 August 2026 at 12:30 PM" }} />
    );
  }
  if (k === "proposal") {
    return (
      <Bi cls="links"
        ar={<><a className="lk" href={FIRM.portal} {...ext}>الاطلاع على المقترح</a><small>مقترح إعادة التنظيم المالي، في بوابة الدائن</small></>}
        en={<><a className="lk" href={FIRM.portal} {...ext}>View Proposal</a><small>Financial Reorganization Proposal, in the Creditor Portal</small></>} />
    );
  }
  if (k === "contact") {
    return (
      <Bi
        ar={<p className="ct"><span>للاستفسارات</span>بريد إلكتروني: <a href={`mailto:${FIRM.email}`} dir="ltr">{FIRM.email}</a></p>}
        en={<p className="ct"><span>For inquiries</span>Email: <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a></p>} />
    );
  }
  const [, ar, en] = b as [string, string, string];
  switch (k) {
    case "dates": return <Bi cls="dates" ar={<span className="dt">{ar}</span>} en={<span className="dt">{en}</span>} />;
    case "title": return <Bi ar={<h2 className="ttl">{ar}</h2>} en={<h2 className="ttl">{en}</h2>} />;
    case "ref": return <Bi ar={<p className="ref">{ar}</p>} en={<p className="ref">{en}</p>} />;
    case "to": return <Bi ar={<p className="to">{ar}</p>} en={<p className="to">{en}</p>} />;
    case "p": return <Bi ar={<p>{ar}</p>} en={en ? <p>{en}</p> : null} />;
    case "h": return <Bi cls="hd" ar={<h3>{ar}</h3>} en={<h3>{en}</h3>} />;
    case "sub": return <Bi ar={<h4>{ar}</h4>} en={<h4>{en}</h4>} />;
    case "line": return <Bi ar={<p className="ln">{ar}</p>} en={<p className="ln">{en}</p>} />;
    case "li": return <Bi ar={<p className="li">{ar}</p>} en={<p className="li">{en}</p>} />;
    case "thanks": return <Bi ar={<p className="thanks">{ar}</p>} en={<p className="thanks">{en}</p>} />;
    default: return null;
  }
}
