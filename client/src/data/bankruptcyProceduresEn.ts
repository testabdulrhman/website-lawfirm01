import type { BankruptcyProcedure } from "./bankruptcyProcedures";

/**
 * English content for the seven procedures under the Saudi Bankruptcy Law.
 * The Arabic dataset remains the legal-language source; this copy gives the
 * English routes complete, indexable content instead of rendering Arabic text.
 */
export const bankruptcyProceduresEn: BankruptcyProcedure[] = [
  {
    slug: "preventive-settlement",
    questionTitle: "What Is Preventive Settlement and How Is It Filed?",
    name: "Preventive Settlement",
    metaDescription:
      "A guide to preventive settlement under the Saudi Bankruptcy Law: purpose, eligibility, filing stages and frequently asked questions.",
    tldr:
      "Preventive settlement allows a debtor to reach an agreement with creditors while retaining management of the business. Only the debtor may file the application, and the Commercial Court considers it within no more than forty days from registration.",
    definition:
      "Preventive settlement is a bankruptcy procedure through which a debtor seeks an agreement with creditors to settle or reschedule debts while continuing to manage the business.",
    objective:
      "To address financial distress before it worsens, preserve viable businesses and protect creditors through an orderly and fair settlement.",
    eligibility:
      "Only the debtor may apply to the Commercial Court to commence preventive settlement.",
    whenToUse: [
      "When the debtor expects financial disruption that may lead to distress.",
      "When the debtor is financially distressed.",
      "When the debtor is bankrupt.",
    ],
    steps: [
      { title: "File the application", desc: "The debtor files an application with the Commercial Court through the commercial judiciary service." },
      { title: "Court review", desc: "The court schedules consideration of the application within no more than forty days after registration." },
      { title: "Court decision", desc: "The court may commence the procedure, reject the application or adjourn consideration." },
      { title: "Settlement process", desc: "The required trustee notation is completed and the debtor works with creditors toward the proposed settlement." },
    ],
    keywords: "Saudi preventive settlement, Saudi Bankruptcy Law, debt restructuring, Commercial Court",
    isSmallDebtor: false,
    faqs: [
      { q: "Who may apply for preventive settlement?", a: "The debtor alone may apply to the court to commence preventive settlement." },
      { q: "When may the debtor apply?", a: "The debtor may apply when financial disruption is expected, or when the debtor is distressed or bankrupt." },
      { q: "When does the court consider the application?", a: "The court sets a hearing within no more than forty days from the date the application is registered." },
    ],
  },
  {
    slug: "preventive-settlement-small-debtors",
    questionTitle: "What Is Preventive Settlement for Small Debtors?",
    name: "Preventive Settlement for Small Debtors",
    metaDescription:
      "An English guide to preventive settlement for small debtors in Saudi Arabia, including the debt threshold, purpose and commencement process.",
    tldr:
      "This simplified procedure enables a debtor whose total debts do not exceed SAR 2 million to reach an agreement with creditors through an efficient, lower-cost process while retaining management of the business.",
    definition:
      "It is the preventive settlement procedure adapted for small debtors. A debtor is treated as a small debtor when total debts at commencement do not exceed SAR 2 million.",
    objective:
      "To help a small debtor reach an agreement with creditors quickly through a simplified, efficient and lower-cost process.",
    eligibility:
      "The small debtor issues the commencement decision using the approved form. The decision takes effect when it is deposited in the Bankruptcy Register.",
    whenToUse: [
      "When the debtor's total debts at commencement do not exceed SAR 2 million.",
      "When the small debtor needs an early agreement with creditors while continuing to manage the business.",
    ],
    steps: [
      { title: "Confirm the threshold", desc: "Confirm that total debts do not exceed SAR 2 million." },
      { title: "Issue the decision", desc: "The small debtor issues the commencement decision using the approved form." },
      { title: "Deposit the decision", desc: "The decision becomes effective when deposited in the Bankruptcy Register." },
      { title: "Reach an agreement", desc: "The debtor proceeds toward a settlement with creditors within the simplified framework." },
    ],
    keywords: "small debtor preventive settlement, Saudi bankruptcy, SAR 2 million debt threshold",
    isSmallDebtor: true,
    faqs: [
      { q: "Who qualifies as a small debtor?", a: "A debtor whose total debts at commencement do not exceed SAR 2 million." },
      { q: "Who issues the commencement decision?", a: "The small debtor issues it using the approved form, and it takes effect after deposit in the Bankruptcy Register." },
      { q: "Does the debtor retain management of the business?", a: "Yes. The debtor retains management while seeking an agreement with creditors." },
    ],
  },
  {
    slug: "financial-reorganization",
    questionTitle: "What Is Financial Reorganization and Who May Apply?",
    name: "Financial Reorganization",
    metaDescription:
      "A guide to financial reorganization under the Saudi Bankruptcy Law, including who may apply, court review and the main stages.",
    tldr:
      "Financial reorganization restructures the debts of a distressed debtor to support business continuity. The debtor, a creditor or the competent authority may apply, and the court considers the application within no more than forty days.",
    definition:
      "Financial reorganization is a court-supervised procedure for restructuring a distressed or bankrupt debtor's obligations and reaching an arrangement with creditors.",
    objective:
      "To preserve a viable business by restructuring debt while protecting creditors fairly under court and trustee supervision.",
    eligibility:
      "The debtor, a creditor or the competent authority may apply. If a person other than the debtor applies, the court must notify the debtor within no more than five days.",
    whenToUse: [
      "When the debtor is financially distressed.",
      "When the debtor is bankrupt.",
      "When financial disruption is expected and may lead to distress.",
    ],
    steps: [
      { title: "File the application", desc: "The debtor, a creditor or the competent authority files with the Commercial Court." },
      { title: "Notify the debtor", desc: "If another party files, the court notifies the debtor within no more than five days." },
      { title: "Court review", desc: "The court considers the application within no more than forty days after registration." },
      { title: "Court decision", desc: "The court may commence the procedure, reject the application or adjourn consideration." },
    ],
    keywords: "Saudi financial reorganization, debt restructuring, Saudi Bankruptcy Law, Commercial Court",
    isSmallDebtor: false,
    faqs: [
      { q: "Who may apply for financial reorganization?", a: "The debtor, a creditor or the competent authority may apply." },
      { q: "May a creditor file the application?", a: "Yes. If a person other than the debtor applies, the court notifies the debtor within no more than five days." },
      { q: "When does the court consider the application?", a: "Within no more than forty days from registration of the application." },
    ],
  },
  {
    slug: "financial-reorganization-small-debtors",
    questionTitle: "What Is Financial Reorganization for Small Debtors?",
    name: "Financial Reorganization for Small Debtors",
    metaDescription:
      "A guide to Saudi financial reorganization for small debtors, including the SAR 2 million threshold, eligibility and simplified stages.",
    tldr:
      "This procedure restructures a small debtor's debts through a simplified and lower-cost process under a bankruptcy trustee's management. It applies where total debts do not exceed SAR 2 million.",
    definition:
      "It is a simplified financial reorganization procedure for small debtors, designed to restructure obligations efficiently under the management of a bankruptcy trustee.",
    objective:
      "To help a viable small debtor continue operating by restructuring debt through a simpler, faster and lower-cost process.",
    eligibility:
      "The small debtor, a creditor or the competent authority may commence or request the procedure in accordance with the approved statutory process.",
    whenToUse: [
      "When total debts at commencement do not exceed SAR 2 million.",
      "When the small debtor is distressed, bankrupt or expects financial disruption.",
    ],
    steps: [
      { title: "Confirm the threshold", desc: "Confirm that the debtor qualifies as a small debtor under the SAR 2 million threshold." },
      { title: "Commence or apply", desc: "The eligible party follows the approved commencement or court application process." },
      { title: "Appoint the trustee", desc: "A listed bankruptcy trustee manages and supervises the procedure." },
      { title: "Prepare the proposal", desc: "A reorganization proposal is prepared and presented to creditors under the simplified rules." },
    ],
    keywords: "small debtor financial reorganization, Saudi bankruptcy trustee, SAR 2 million",
    isSmallDebtor: true,
    faqs: [
      { q: "What is the small-debtor threshold?", a: "Total debts at commencement must not exceed SAR 2 million." },
      { q: "Who manages this procedure?", a: "A bankruptcy trustee manages the procedure under the applicable statutory rules." },
      { q: "What is its main purpose?", a: "To restructure debt and preserve a viable small debtor through a simplified, efficient process." },
    ],
  },
  {
    slug: "liquidation",
    questionTitle: "What Is Liquidation and Who May Request It?",
    name: "Liquidation",
    metaDescription:
      "A guide to liquidation under the Saudi Bankruptcy Law: purpose, eligibility, minimum creditor debt and the principal stages.",
    tldr:
      "Liquidation is used to collect and sell bankruptcy assets and distribute the proceeds to creditors under a trustee's management. The debtor, a creditor or the competent authority may apply, subject to the statutory conditions.",
    definition:
      "Liquidation is a bankruptcy procedure in which a trustee inventories and sells the bankruptcy assets and distributes the proceeds among creditors according to statutory priorities.",
    objective:
      "To realise the debtor's assets and distribute the proceeds fairly and efficiently to creditors under the supervision of the court and trustee.",
    eligibility:
      "The debtor, a creditor or the competent authority may apply. A creditor's debt must meet the applicable minimum threshold, currently SAR 50,000.",
    whenToUse: [
      "When the debtor is distressed or bankrupt and rehabilitation is not appropriate.",
      "When a creditor meets the statutory debt and notice requirements.",
    ],
    steps: [
      { title: "File the application", desc: "An eligible party files the liquidation application with the Commercial Court." },
      { title: "Court decision", desc: "The court reviews the statutory requirements and decides whether to commence liquidation." },
      { title: "Inventory and claims", desc: "The trustee inventories assets and receives and verifies creditor claims." },
      { title: "Sale and distribution", desc: "Assets are sold and the proceeds distributed according to statutory priorities." },
    ],
    keywords: "Saudi liquidation procedure, bankruptcy trustee, creditor claim, liquidation assets",
    isSmallDebtor: false,
    faqs: [
      { q: "Who may request liquidation?", a: "The debtor, a creditor or the competent authority may apply, subject to the statutory conditions." },
      { q: "What is the minimum debt for a creditor application?", a: "The applicable minimum debt is SAR 50,000." },
      { q: "Who manages the liquidation?", a: "A licensed bankruptcy trustee manages the procedure under court supervision." },
    ],
  },
  {
    slug: "liquidation-small-debtors",
    questionTitle: "What Is Liquidation for Small Debtors?",
    name: "Liquidation for Small Debtors",
    metaDescription:
      "A guide to liquidation for small debtors in Saudi Arabia, including eligibility, creditor threshold and the simplified sale and distribution process.",
    tldr:
      "This simplified procedure sells a small debtor's bankruptcy assets and distributes the proceeds to creditors under a trustee's management. It applies where total debts do not exceed SAR 2 million.",
    definition:
      "Liquidation for small debtors is a simplified, efficient and lower-cost procedure for selling bankruptcy assets and distributing the proceeds under a trustee's management.",
    objective:
      "To complete the sale and distribution of a small debtor's assets within a reasonable period using a simplified process.",
    eligibility:
      "The small debtor or competent authority may issue the commencement decision after agreement with a listed trustee. A creditor may also apply subject to the statutory requirements.",
    whenToUse: [
      "When the debtor's total debts do not exceed SAR 2 million.",
      "For a creditor application, when the debt is at least SAR 50,000 and the other statutory conditions are met.",
    ],
    steps: [
      { title: "Confirm the threshold", desc: "Confirm that total debts do not exceed SAR 2 million." },
      { title: "Agree with a trustee", desc: "Agree with a person listed as a bankruptcy trustee before the commencement decision." },
      { title: "Commence the procedure", desc: "The small debtor or competent authority follows the approved commencement process." },
      { title: "Sell and distribute", desc: "The trustee sells the assets and distributes proceeds to creditors." },
    ],
    keywords: "small debtor liquidation, Saudi bankruptcy trustee, asset sale, creditor distribution",
    isSmallDebtor: true,
    faqs: [
      { q: "Who qualifies as a small debtor?", a: "A debtor whose total debts at commencement do not exceed SAR 2 million." },
      { q: "What is the creditor debt threshold?", a: "The minimum debt enabling a creditor to seek liquidation is SAR 50,000." },
      { q: "Who manages the procedure?", a: "A listed bankruptcy trustee manages the sale of assets and distribution of proceeds." },
    ],
  },
  {
    slug: "administrative-liquidation",
    questionTitle: "What Is Administrative Liquidation and When Is It Used?",
    name: "Administrative Liquidation",
    metaDescription:
      "A guide to administrative liquidation under the Saudi Bankruptcy Law, used when asset proceeds are unlikely to cover liquidation costs.",
    tldr:
      "Administrative liquidation applies when the proceeds expected from selling the debtor's assets are insufficient to cover the costs of ordinary or small-debtor liquidation. The debtor or competent authority may apply.",
    definition:
      "Administrative liquidation is a procedure managed by the Bankruptcy Commission for estates whose assets are not expected to generate enough proceeds to cover liquidation costs.",
    objective:
      "To deal efficiently with low-asset estates where an ordinary liquidation process would not be economically viable.",
    eligibility:
      "The debtor or competent authority may apply when the debtor is distressed or bankrupt, or when the assets are insufficient to cover liquidation costs.",
    whenToUse: [
      "When the debtor is distressed or bankrupt.",
      "When the debtor's assets are insufficient to cover ordinary or small-debtor liquidation costs.",
    ],
    steps: [
      { title: "Assess the assets", desc: "Determine that expected asset proceeds will not cover liquidation costs." },
      { title: "File the application", desc: "The debtor or competent authority applies to the Commercial Court." },
      { title: "Commission management", desc: "The Bankruptcy Commission manages the administrative liquidation." },
      { title: "Sale and closure", desc: "Available assets are realised and the procedure is concluded under the statutory rules." },
    ],
    keywords: "Saudi administrative liquidation, Bankruptcy Commission, insufficient assets, liquidation costs",
    isSmallDebtor: false,
    faqs: [
      { q: "What is the purpose of administrative liquidation?", a: "It addresses estates whose asset proceeds are unlikely to cover the costs of ordinary liquidation." },
      { q: "Who may apply?", a: "The debtor or the competent authority may apply when the statutory conditions are met." },
      { q: "Who manages the procedure?", a: "The Saudi Bankruptcy Commission manages administrative liquidation." },
    ],
  },
];

export function getEnglishProcedureBySlug(slug: string): BankruptcyProcedure | undefined {
  return bankruptcyProceduresEn.find((procedure) => procedure.slug === slug);
}
