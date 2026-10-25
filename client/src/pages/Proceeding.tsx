/**
 * One page per proceeding the firm administers: who the debtor is, where the proceeding stands,
 * what creditors need, and who answers for it. Empty fields are not shown.
 */
import type { CSSProperties, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "@/pages/NotFound";
import {
  FIRM, TRACK, findProceeding, fmt, riyadhDay, isOpen, daysLeft, leftText, shortName, courtCity,
  stagesOf, headline, docsOf, activeNotice, phaseOf, untilText, proceedingTitle,
  type Proceeding as P, type ProceedingNotice,
} from "@/data/proceedings";
import { ProceedingsShell, useNow, Arrow, Out, Diamond, Num, Crumb, ext } from "@/components/proceedings/shared";

/* where each court city's name sits over the map, as a share of the map's box */
const CITY = {
  riyadh: { ar: "الرياض", left: "57.2%", top: "58.8%" },
  dammam: { ar: "الدمام", left: "72.8%", top: "48.5%" },
} as const;

const DOC_KIND = { link: "رابط رسمي", page: "صفحة على الموقع", notice: "إشعار على الموقع" } as const;

export default function Proceeding() {
  const [location] = useLocation();
  const slug = decodeURIComponent(location.split(/[?#]/, 1)[0].replace(/\/+$/, "").split("/")[2] || "");
  const p = findProceeding(slug);
  const now = useNow(p?.notices?.length ? 30_000 : undefined);

  useSEO({
    title: p ? proceedingTitle(p) : "الإجراء غير موجود",
    description: p ? p.seo.description : "",
    canonical: p ? `/bankruptcy/${p.slug}` : undefined,
    noindex: !p || !!p.person,
    arabicOnly: !p?.enPage,
  });

  if (!p) return <NotFound />;
  return <CasePage p={p} now={now} />;
}

function CasePage({ p, now }: { p: P; now: number }) {
  const T = TRACK[p.track];
  const today = riyadhDay(now);
  const open = isOpen(p, today);
  const S = stagesOf(p, today);
  const L = S.find(s => s.state === "latest");
  const doneN = S.filter(s => s.state !== "next").length;
  const city = courtCity(p.court);
  const [court, circuit] = (p.court || "").split(" — ");
  const notice = activeNotice(p, now);

  const facts: [string, ReactNode][] = [];
  if (p.cr) facts.push(["السجل التجاري", <Num v={p.cr} />]);
  if (p.uni) facts.push(["الرقم الموحد", <Num v={p.uni} />]);
  if (p.form) facts.push(["الشكل النظامي", p.form]);
  if (p.activity) facts.push(["النشاط", p.activity]);
  if (p.hq) facts.push(["المقر", p.hq]);
  if (p.founded) facts.push(["تاريخ التأسيس", p.founded]);
  /* a full profile sits beside its facts; a one-line profile sits above them */
  const twoCol = !!p.about;
  const showFile = !p.person && (p.lead || p.about || facts.length > 0);
  const D = docsOf(p);

  return (
    <ProceedingsShell>
      <section className="mast">
        <div className="wrap">
          <Crumb trail={[
            { label: "إجراءات الإفلاس", href: "/bankruptcy" },
            { label: "الإجراءات القائمة", href: "/bankruptcy/proceedings" },
            { label: shortName(p.name) },
          ]} />
          <div className="mast-grid">
            <div className="mast-text">
              {p.logo && (
                <span className="logo-tile"><img src={p.logo} alt={`شعار ${p.name}`} width={67} height={67} /></span>
              )}
              <p className="eyebrow"><span>{T.eyebrow}</span><i></i><span className="on">قائم</span></p>
              <h1>{p.name}</h1>
              {p.en && <p className="en" lang="en">{p.en}</p>}
              {p.prior && (
                <p className="prior">
                  حُوِّل إلى التصفية بعد إنهاء إجراء إعادة التنظيم المالي (م90)، المفتتح في {fmt(p.prior.opened)}
                  {p.prior.caseNo !== p.caseNo && <> بالقضية <span className="num">{p.prior.caseNo}</span></>}.
                </p>
              )}
              <dl className="keys">
                {court && (
                  <div><dt>المحكمة المختصة</dt><dd>{court}{circuit && <small>{circuit}</small>}</dd></div>
                )}
                {p.caseNo && <div><dt>رقم القضية</dt><dd><Num v={p.caseNo} /></dd></div>}
                {p.openRef && <div><dt>رقم حكم الافتتاح</dt><dd><Num v={p.openRef} /></dd></div>}
              </dl>
            </div>
            <div className="mast-map" aria-hidden="true">
              <img src={`/images/proceedings/ksa${city ? `-${city}` : ""}.svg`} alt="" width={1040} height={858} decoding="async" />
              {city && <span className="city" style={{ left: CITY[city].left, top: CITY[city].top }}>{CITY[city].ar}</span>}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        {notice ? (
          <NoticeBanner p={p} n={notice} now={now} />
        ) : (
          <div className={`status${open ? " is-open" : ""}`}>
            <div className="st-txt">
              <p className="label">للدائنين</p>
              <p className="st-h">{open ? `باب المطالبات مفتوح حتى ${fmt(p.deadline)}` : "تابع مطالبتك وراسل الأمين"}</p>
              <p className="st-s">
                {open && <><b>{leftText(daysLeft(p, today))}.</b> </>}
                من بوابة الدائن تُقدَّم المطالبات ومستنداتها وتُتابَع، ومنها تُراسَل {T.role}.
              </p>
            </div>
            <div className="st-act">
              <a className="btn ink" href={FIRM.portal} {...ext}>{open ? "تقديم مطالبة" : "متابعة مطالبة"} <Arrow /></a>
              {open && <a className="btn ghost" href={FIRM.portal} {...ext}>متابعة مطالبة</a>}
            </div>
          </div>
        )}
      </div>

      <section className="wrap prog" aria-labelledby="pg-h">
        <div className="prog-head">
          <p className="label">أين وصل الإجراء</p>
          <h2 id="pg-h">{headline(L, p)}</h2>
          <p className="sub">
            {L?.when && !L.current && <>آخر مستجد · {fmt(L.when)}</>}
            <span>المرحلة {doneN} من {S.length}</span>
          </p>
        </div>
        <ol className="steps" style={{ "--n": S.length, "--done": doneN } as CSSProperties}>
          {S.map(s => (
            <li key={s.t} className={s.state} aria-current={s.state === "latest" ? "step" : undefined}>
              <span className="mk"><Diamond /></span>
              <h3>{s.t}</h3>
              <p>{s.when ? fmt(s.when) : ""}</p>
            </li>
          ))}
        </ol>
      </section>

      {showFile && (
        <section className={`wrap file${twoCol ? " has-about" : ""}`} aria-labelledby="fl-h">
          <header className="file-h"><h2 id="fl-h">عن الشركة</h2></header>
          {p.lead && !twoCol && <p className="lead solo">{p.lead}</p>}
          <div className="file-grid">
            {twoCol && (
              <div className="about">
                {p.lead && <p className="lead">{p.lead}</p>}
                <div className="prose">{p.about!.map((x, i) => <p key={i}>{x}</p>)}</div>
                {p.products && (
                  <>
                    <p className="sub-l">المنتجات</p>
                    <ul className="prods">{p.products.map(x => <li key={x}>{x}</li>)}</ul>
                  </>
                )}
              </div>
            )}
            {facts.length > 0 && (
              <dl className="ledger">
                {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            )}
          </div>
        </section>
      )}

      <section className="wrap docs-sec" aria-labelledby="dc-h">
        <header className="file-h"><h2 id="dc-h">المستندات والإعلانات</h2></header>
        {D.length ? (
          <ol className="docs">
            {D.map(d => (
              <li key={d.no}>
                <span className="no">{String(d.no).padStart(2, "0")}</span>
                <div>
                  <h3>{d.title}</h3>
                  <p className="meta"><span>{d.issuer}</span><i></i><span>{d.show || fmt(d.on)}</span><i></i><span>{DOC_KIND[d.kind]}</span></p>
                </div>
                <div className="acts">
                  {d.kind === "notice"
                    ? <Link href={d.url}>قراءة الإشعار <Arrow /></Link>
                    : <a href={d.url} {...ext}>{d.kind === "link" ? "فتح الإعلان" : "فتح"} <Out /></a>}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty">لا توجد مستندات منشورة لهذا الإجراء حتى الآن.</p>
        )}
      </section>

      <section className="trustee" aria-label={T.role}>
        <div className="wrap tr-grid">
          <div>
            <p className="label">{T.role}</p>
            <h2>{FIRM.name}</h2>
            <p className="lic">أمين إفلاس مرخّص، ترخيص رقم <span className="num">{FIRM.licence}</span></p>
          </div>
          <dl>
            <div><dt>المراسلة</dt><dd><a href={FIRM.portal} {...ext}>عبر بوابة الدائن</a></dd></div>
            <div><dt>الهاتف</dt><dd><a href={`tel:${FIRM.phone}`} className="num">{FIRM.phone}</a></dd></div>
          </dl>
        </div>
      </section>
      <div className="wrap disc">
        <p>تعرّف هذه الصفحة بالإجراء ومستجداته، والمرجع النهائي هو أحكام المحكمة المختصة، والإعلانات الرسمية للجنة الإفلاس، وبوابة الدائن. المعلومات المنشورة هنا لا تُعد استشارة قانونية.</p>
      </div>
    </ProceedingsShell>
  );
}

/* while a notice's event is ahead, it takes the creditor's card */
function NoticeBanner({ p, n, now }: { p: P; n: ProceedingNotice; now: number }) {
  const ph = phaseOf(n, now);
  return (
    <div className={`status notice${ph === "during" ? " is-live" : ""}`}>
      <div className="st-txt">
        <p className="label">إشعار للدائنين</p>
        <p className="st-h">{n.title}</p>
        <p className="st-s">
          <b>{ph === "during" ? "التصويت مفتوح الآن حتى 3:00 مساءً" : `يبدأ التصويت بعد ${untilText(n.start, now)}`}.</b>{" "}
          {n.dayAr} {fmt(n.date)}، من 1:00 إلى 3:00 مساءً، إلكترونياً عبر بوابة الدائن.
        </p>
      </div>
      <div className="st-act">
        <Link className="btn ink" href={`/bankruptcy/${p.slug}/${n.slug}`}>قراءة الإعلان <Arrow /></Link>
        <a className="btn ghost" href={FIRM.portal} {...ext}>{ph === "during" ? "التصويت الآن" : "بوابة الدائن"}</a>
      </div>
    </div>
  );
}
