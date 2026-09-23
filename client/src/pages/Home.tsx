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
      <section className="flex min-h-[720px] items-end bg-[#e6dfea] text-[#181b20] md:min-h-[min(780px,100svh)]">
        <div className="container mx-auto px-6 pb-24 pt-48 md:px-10 md:pb-28 lg:px-16 lg:pb-32">
          <div className="max-w-[920px]">
            <h1 className="max-w-[900px] font-body text-[clamp(2.5rem,5vw,4.7rem)] font-medium leading-[1.42] tracking-[-0.035em]">
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
            <p className="mt-10 max-w-[590px] border-s border-[#8e7d9a] ps-6 font-body text-base leading-9 text-[#4c4d4c] md:mt-12 md:text-lg md:leading-10">
              {isArabic
                ? "ممارسة قانونية للشركات وأصحاب المصالح في المسائل التجارية وإجراءات التعثر، وفق تراخيص مهنية مستقلة."
                : "Legal practice for businesses and stakeholders in commercial matters and insolvency proceedings, under separate professional licenses."}
            </p>
            <Link
              href={lp("/about")}
              className="mt-10 inline-block border-b border-[#181b20] pb-2 font-body text-sm text-[#181b20] transition-colors hover:text-[#675873] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181b20]"
            >
              {isArabic ? "عن الشركة" : "About the firm"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fdfcfe] py-24 text-[#181b20] md:py-32">
        <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-24 lg:px-16">
          <div className="max-w-[760px]">
            <p className="mb-6 font-body text-xs text-[#675873]">
              {isArabic ? "عن الشركة" : "The firm"}
            </p>
            <h2 className="font-body text-[clamp(1.6rem,2.8vw,2.45rem)] font-medium leading-[1.55] tracking-[-0.025em]">
              {isArabic
                ? "ممارسة مهنية بصفات وتراخيص مستقلة"
                : "Distinct professional capacities and licenses"}
            </h2>
            <p className="mt-8 font-body text-base leading-9 text-[#4c4d4c] md:mt-10 md:text-lg md:leading-10">
              {isArabic
                ? "تمارس الشركة المحاماة في المنازعات التجارية، وأعمال أمناء الإفلاس، والتوثيق والتسجيل العيني بموجب تراخيص مهنية مستقلة. وتُحدَّد في كل تكليف الصفة التي تُباشَر بها المهمة ونطاقها."
                : "The firm practices commercial litigation, licensed bankruptcy trustee work, notarization and real estate registration under distinct professional licenses. Each engagement is defined by its professional capacity and scope."}
            </p>
            <p className="mt-6 font-body text-base leading-9 text-[#4c4d4c] md:text-lg md:leading-10">
              {isArabic
                ? "نعمل مع الشركات وأصحاب المصالح في المسائل التي تتطلب تقديراً قانونياً دقيقاً وإدارة منظمة للإجراءات."
                : "We work with businesses and stakeholders on matters that call for careful legal judgment and disciplined management of proceedings."}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#d8d0de] pt-7 font-body text-sm">
              <Link href={lp("/about")} className="border-b border-[#181b20] pb-1 hover:text-[#675873]">
                {isArabic ? "التعرّف على الشركة" : "About us"}
              </Link>
            </div>
          </div>
          <aside className="self-start border-t border-[#bdb0c6] pt-6 lg:mt-16" aria-label={isArabic ? "مجالات العمل" : "Practice areas"}>
            <p className="mb-5 font-body text-xs text-[#675873]">
              {isArabic ? "مجالات العمل" : "Practice areas"}
            </p>
            <nav className="font-body" aria-label={isArabic ? "مجالات العمل" : "Practice areas"}>
              {[
                { path: "/services/bankruptcy", ar: "إدارة إجراءات الإفلاس", en: "Bankruptcy administration" },
                { path: "/services/civil-commercial", ar: "المنازعات التجارية", en: "Commercial disputes" },
                { path: "/services/documentation", ar: "التوثيق والعقود", en: "Notarization and contracts" },
              ].map((practice) => (
                <Link
                  key={practice.path}
                  href={lp(practice.path)}
                  className="block border-b border-[#e3dde7] py-5 text-lg font-medium leading-relaxed text-[#181b20] transition-colors hover:text-[#675873] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181b20] md:text-xl"
                >
                  {isArabic ? practice.ar : practice.en}
                </Link>
              ))}
            </nav>
            <Link href={lp("/services")} className="mt-6 inline-block border-b border-[#181b20] pb-1 font-body text-sm hover:text-[#675873]">
              {isArabic ? "جميع مجالات العمل" : "All practice areas"}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
