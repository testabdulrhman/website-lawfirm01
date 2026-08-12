/**
 * Lightweight homepage-only article metadata.
 *
 * Home previously imported the complete article archive (including every
 * article body) just to render three cards. Keeping the highlights separate
 * avoids shipping that editorial payload on the site's most visited page.
 */
export const blogHighlights = [
  {
    id: "1",
    slug: "تعليق-المطالبات-في-نظام-الإفلاس-السعودي",
    title: "تعليق المطالبات في نظام الإفلاس السعودي: دليل قانوني شامل",
    excerpt:
      "تعرف على مفهوم تعليق المطالبات في نظام الإفلاس السعودي، أهدافه، حالات تطبيقه، وأثره القانوني على الدائنين والمدينين لضمان استمرارية النشاط التجاري.",
    date: "2025-05-20",
    readTime: "12 دقيقة",
    category: "الإفلاس",
  },
  {
    id: "2",
    slug: "التسوية-الوقائية-في-نظام-الإفلاس-السعودي",
    title: "التسوية الوقائية في نظام الإفلاس السعودي",
    excerpt:
      "تواجه العديد من الشركات والتجار تحديات مالية قد تؤدي إلى تعثرهم في الوفاء بالتزاماتهم المالية. تعرف على إجراء التسوية الوقائية كأداة قانونية فعالة لتجنب الإفلاس.",
    date: "2025-05-10",
    readTime: "10 دقائق",
    category: "الإفلاس",
  },
  {
    id: "3",
    slug: "الدليل-الإرشادي-لنظام-الإفلاس-ولائحته-التنفيذية",
    title: "نظام الإفلاس السعودي: الإجراءات السبعة واللائحة التنفيذية",
    excerpt:
      "شرح عملي ومحدث لنظام الإفلاس السعودي ولائحته التنفيذية، والإجراءات السبعة، وكيفية اختيار الإجراء المناسب، وحقوق المدين والدائن.",
    date: "2025-04-28",
    readTime: "16 دقيقة",
    category: "الإفلاس",
  },
] as const;
