/**
 * The proceedings the firm administers: those whose claims period is open first,
 * then every proceeding, newest first, each leading to its own page.
 */
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import {
  FIRM, TRACK, PROCEEDINGS, fmt, riyadhDay, isOpen, daysLeft, leftText, shortName, statusOf, type Track,
} from "@/data/proceedings";
import { ProceedingsShell, useNow, Arrow, Num, Crumb, ext } from "@/components/proceedings/shared";

export const INDEX_SEO = {
  title: "الإجراءات القائمة | أمين الإفلاس",
  description: "إجراءات الإفلاس التي تتولاها شركة عبدالرحمن بن رضوان المشيقح بصفتها أمين إفلاس: لكل إجراء صفحة فيها بياناته ومراحله وإعلاناته، وطريق الدائن إلى بوابة الدائن.",
};

export default function ProceedingsIndex() {
  const now = useNow();
  const today = riyadhDay(now);
  useSEO({ ...INDEX_SEO, canonical: "/bankruptcy/proceedings", arabicOnly: true });

  const openP = PROCEEDINGS.filter(p => isOpen(p, today)).sort((a, b) => (a.deadline! < b.deadline! ? -1 : 1));
  const count = (k: Track) => PROCEEDINGS.filter(p => p.track === k).length;
  const rows = [...PROCEEDINGS].sort((a, b) => (a.opened < b.opened ? 1 : -1));

  return (
    <ProceedingsShell>
      <section className="ident idx">
        <div className="wrap">
          <Crumb trail={[{ label: "إجراءات الإفلاس", href: "/bankruptcy" }, { label: "الإجراءات القائمة" }]} />
          <div className="idx-top">
            <div>
              <p className="eyebrow"><span>أمانة الإفلاس</span></p>
              <h1>الإجراءات القائمة</h1>
              <p className="intro">إجراءات إفلاس تتولاها الشركة. لكل إجراء صفحة فيها بياناته ومراحله وإعلاناته، وطريق الدائن إلى مطالبته.</p>
            </div>
            <dl className="tally">
              <div><dd className="num">{PROCEEDINGS.length}</dd><dt>إجراءً قائماً</dt></div>
              <div><dd className="num">{count("liq")}</dd><dt>تصفية</dt></div>
              <div><dd className="num">{count("reorg")}</dd><dt>إعادة تنظيم مالي</dt></div>
              <div><dd className="num">{count("small")}</dd><dt>تصفية لصغار المدينين</dt></div>
            </dl>
          </div>
        </div>
      </section>

      {openP.length > 0 && (
        <section className="opennow" aria-labelledby="on-h">
          <div className="wrap">
            <div className="hd"><h2 id="on-h">باب المطالبات مفتوح الآن</h2><p>يُحسب آخر يوم من المدة كاملاً</p></div>
            <div className="cards">
              {openP.map(p => (
                <article key={p.slug}>
                  <p className="tr">{TRACK[p.track].label}</p>
                  <h3>{shortName(p.name)}</h3>
                  <p className="dl">حتى {fmt(p.deadline)}<span>{leftText(daysLeft(p, today))}</span></p>
                  <div className="row2">
                    <a className="btn solid" href={FIRM.portal} {...ext}>تقديم مطالبة</a>
                    <Link className="lk" href={`/bankruptcy/${p.slug}`}>صفحة الإجراء</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap listing" aria-label="الإجراءات">
        <div className="th" aria-hidden="true">
          <span>المدين</span><span>المحكمة</span><span>رقم القضية</span><span>الافتتاح</span><span>الحال</span><span></span>
        </div>
        <ul className="procs">
          {rows.map(p => {
            const st = statusOf(p, today);
            return (
              <li key={p.slug}>
                <Link href={`/bankruptcy/${p.slug}`}>
                  <div className="nm"><h3>{shortName(p.name)}</h3><span>{TRACK[p.track].label}</span></div>
                  <span className="ct">{p.court ? p.court.replace(/ — .*/, "") : "—"}</span>
                  <span className="cn">{p.caseNo ? <Num v={p.caseNo} /> : "—"}</span>
                  <span className="op">{fmt(p.opened)}</span>
                  <span className={`pill${st.open ? " is-open" : ""}`}>{st.text}</span>
                  <span className="go"><Arrow /></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <div className="wrap disc">
        <p>البيانات من سجلات الأمين وإعلانات لجنة الإفلاس، والمرجع النهائي هو أحكام المحكمة المختصة، والإعلانات الرسمية للجنة الإفلاس، وبوابة الدائن.</p>
      </div>
    </ProceedingsShell>
  );
}
