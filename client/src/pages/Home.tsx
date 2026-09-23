import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEO } from "@/hooks/useSEO";
import { localePath } from "@/lib/localePath";
import { FIRM_NAME_AR, FIRM_NAME_EN } from "@/lib/firmIdentity";

export default function Home() {
  const { lang } = useTranslation();
  const isArabic = lang === "ar";
  const lp = (path: string) => localePath(path, lang);

  useSEO({
    fullTitle: true,
    title: isArabic ? FIRM_NAME_AR : FIRM_NAME_EN,
    description: isArabic
      ? "شركة سعودية للمحاماة وإدارة إجراءات الإفلاس، تمارس التمثيل القانوني وأعمال أمناء الإفلاس والتوثيق والتسجيل العيني بموجب تراخيص مهنية مستقلة."
      : "A Saudi law firm practicing commercial law, bankruptcy administration, notarization and real estate registration under separate professional licenses.",
    canonical: "/",
  });

  return (
    <>
      <section className="relative isolate flex min-h-[max(700px,100svh)] items-center overflow-hidden bg-[#131e3f] text-white">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 70% 90% at 3% 85%, rgba(55,75,130,.28), transparent 75%)" }}
        />
        <img
          src="/images/brand/icon-tall-white-mono.webp"
          alt=""
          aria-hidden="true"
          width={916}
          height={2152}
          className="pointer-events-none absolute -bottom-24 left-[3%] -z-10 h-[86%] w-[37%] object-contain object-bottom opacity-[0.13] max-lg:left-[-8%] max-lg:w-[55%] max-sm:-bottom-10 max-sm:h-[58%] max-sm:opacity-[0.07]"
        />

        <div className="container mx-auto px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-44 lg:px-16">
          <div className="max-w-[950px]">
            <h1 className="max-w-[930px] font-display text-[clamp(2.8rem,6.2vw,6.4rem)] font-normal leading-[1.34] tracking-[-0.025em] text-[#f8f6f1]">
              {isArabic ? (
                <>
                  المحاماة وإدارة{" "}
                  <br />
                  إجراءات الإفلاس
                </>
              ) : (
                <>
                  Legal Counsel &amp;{" "}
                  <br />
                  Bankruptcy Administration
                </>
              )}
            </h1>
            <p className="mt-9 max-w-[610px] font-body text-base leading-9 text-white/75 md:mt-11 md:text-lg md:leading-10">
              {isArabic
                ? "ممارسة قانونية للشركات وأصحاب المصالح في المسائل التجارية وإجراءات التعثر، وفق تراخيص مهنية مستقلة."
                : "Legal practice for businesses and stakeholders in commercial matters and insolvency proceedings, under separate professional licenses."}
            </p>
            <Link
              href={lp("/about")}
              className="mt-11 inline-flex min-h-12 items-center border border-[#d8c8aa]/70 px-8 py-3 font-body text-sm text-[#f8f6f1] transition-colors hover:border-[#d8c8aa] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8c8aa]"
            >
              {isArabic ? "عن الشركة" : "About the firm"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f6] py-24 text-[#18243b] md:py-36">
        <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-24 lg:px-16">
          <div className="max-w-[760px]">
            <p className="mb-6 font-body text-xs tracking-wide text-[#9d8061]">
              {isArabic ? "عن الشركة" : "The firm"}
            </p>
            <h2 className="font-display text-3xl font-normal leading-[1.65] md:text-4xl lg:text-[2.7rem]">
              {isArabic
                ? "ممارسة مهنية بصفات وتراخيص مستقلة"
                : "Distinct professional capacities and licenses"}
            </h2>
            <p className="mt-8 font-body text-base leading-9 text-[#4d5664] md:mt-10 md:text-lg md:leading-10">
              {isArabic
                ? "تمارس الشركة المحاماة في المنازعات التجارية، وأعمال أمناء الإفلاس، والتوثيق والتسجيل العيني بموجب تراخيص مهنية مستقلة. وتُحدَّد في كل تكليف الصفة التي تُباشَر بها المهمة ونطاقها."
                : "The firm practices commercial litigation, licensed bankruptcy trustee work, notarization and real estate registration under distinct professional licenses. Each engagement is defined by its professional capacity and scope."}
            </p>
            <p className="mt-6 font-body text-base leading-9 text-[#4d5664] md:text-lg md:leading-10">
              {isArabic
                ? "نعمل مع الشركات وأصحاب المصالح في المسائل التي تتطلب تقديراً قانونياً دقيقاً وإدارة منظمة للإجراءات."
                : "We work with businesses and stakeholders on matters that call for careful legal judgment and disciplined management of proceedings."}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#d4d2cb] pt-7 font-body text-sm">
              <Link href={lp("/about")} className="border-b border-[#9d8061] pb-1 hover:text-[#8c7053]">
                {isArabic ? "التعرّف على الشركة" : "About us"}
              </Link>
            </div>
          </div>
          <aside className="self-start border-t border-[#b7b4a9] pt-6 lg:mt-16" aria-label={isArabic ? "مجالات العمل" : "Practice areas"}>
            <p className="mb-5 font-body text-xs tracking-wide text-[#9d8061]">
              {isArabic ? "مجالات العمل" : "Practice areas"}
            </p>
            <nav className="font-display" aria-label={isArabic ? "مجالات العمل" : "Practice areas"}>
              {[
                { path: "/services/bankruptcy", ar: "إدارة إجراءات الإفلاس", en: "Bankruptcy administration" },
                { path: "/services/civil-commercial", ar: "المنازعات التجارية", en: "Commercial disputes" },
                { path: "/services/documentation", ar: "التوثيق والعقود", en: "Notarization and contracts" },
              ].map((practice) => (
                <Link
                  key={practice.path}
                  href={lp(practice.path)}
                  className="block border-b border-[#dedbd3] py-5 text-lg leading-relaxed text-[#18243b] transition-colors hover:text-[#9d8061] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d8061] md:text-xl"
                >
                  {isArabic ? practice.ar : practice.en}
                </Link>
              ))}
            </nav>
            <Link href={lp("/services")} className="mt-6 inline-block border-b border-[#9d8061] pb-1 font-body text-sm hover:text-[#8c7053]">
              {isArabic ? "جميع مجالات العمل" : "All practice areas"}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
