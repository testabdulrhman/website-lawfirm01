import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  PROCEEDINGS, VOTE_ZAHRANI, proceedingTitle, noticeSeo, stagesOf, statusOf, docsOf, isOpen,
  leftText, daysLeft, phaseOf, activeNotice,
} from "./proceedings";

const seoData = JSON.parse(readFileSync(join(__dirname, "../../../scripts/seo-data.json"), "utf8"));
const sitemap = readFileSync(join(__dirname, "../../public/sitemap.xml"), "utf8");

describe("proceedings data", () => {
  it("publishes no claim figures", () => {
    const text = JSON.stringify(PROCEEDINGS);
    expect(text).not.toMatch(/amount|ريال|مطالبة مسجلة|claimsCount/i);
  });

  it("keeps the slugs that were already live", () => {
    const slugs = PROCEEDINGS.map(p => p.slug);
    for (const s of ["ASHYAD-STEEL", "tajalriayaa", "Planting-for-Contracting", "Hassan-Misfer-Al-Zahrani", "Al-Anjaz-Hotel-Village", "Arcon-Gulf-Contracting"]) {
      expect(slugs).toContain(s);
    }
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a prerendered SEO entry for every page, matching the page's own title", () => {
    const index = seoData["/bankruptcy/proceedings"];
    expect(index?.canonical).toBe("https://redwan.sa/bankruptcy/proceedings");
    for (const p of PROCEEDINGS) {
      const e = seoData[`/bankruptcy/${p.slug}`];
      expect(e, p.slug).toBeDefined();
      expect(e.title).toBe(proceedingTitle(p));
      expect(e.description).toBe(p.seo.description);
      expect(!!e.noindex).toBe(!!p.person);
      expect(sitemap.includes(`https://redwan.sa/bankruptcy/${p.slug}</loc>`)).toBe(!p.person);
      for (const n of p.notices || []) {
        const ne = seoData[`/bankruptcy/${p.slug}/${n.slug}`];
        expect(ne?.title).toBe(noticeSeo(p, n).title);
      }
    }
  });

  it("keeps the individual debtor's name out of the URL", () => {
    for (const p of PROCEEDINGS.filter(x => x.person)) {
      expect(p.slug).not.toMatch(/[؀-ۿ]/);
      expect(p.slug.toLowerCase()).not.toContain("harbi");
    }
  });
});

describe("stages and status", () => {
  const rahima = PROCEEDINGS.find(p => p.slug === "Rahima-Al-Ahli-Dispensary")!;
  const zahrani = PROCEEDINGS.find(p => p.slug === "Hassan-Misfer-Al-Zahrani")!;
  const daghm = PROCEEDINGS.find(p => p.slug === "Al-Daghm-General-Contracting")!;

  it("counts the last day of the claims period in full", () => {
    expect(isOpen(rahima, "2026-11-03")).toBe(true);
    expect(isOpen(rahima, "2026-11-04")).toBe(false);
    expect(leftText(daysLeft(rahima, "2026-11-03"))).toBe("اليوم آخر يوم");
    expect(leftText(daysLeft(rahima, "2026-10-26"))).toBe("تبقى 8 أيام");
  });

  it("marks the open claims period as the current stage", () => {
    const S = stagesOf(rahima, "2026-10-26");
    expect(S.find(s => s.state === "latest")?.t).toBe("تقديم المطالبات");
    expect(statusOf(rahima, "2026-10-26")).toEqual({ open: true, text: "باب المطالبات مفتوح" });
  });

  it("follows the reorganization track after the vote", () => {
    const S = stagesOf(zahrani, "2026-10-26");
    expect(S).toHaveLength(7);
    expect(S.find(s => s.state === "latest")?.t).toBe("تصويت الدائنين على المقترح");
    expect(stagesOf(zahrani, "2026-08-15").find(s => s.state === "latest")?.t).toBe("اعتماد قائمة المطالبات");
  });

  it("does not count a claims list awaiting the court as approved", () => {
    expect(statusOf(daghm, "2026-10-26").text).toBe("رُفعت قائمة المطالبات");
  });

  it("numbers documents in order of issue and shows the newest first", () => {
    const D = docsOf(zahrani);
    expect(D.map(d => d.no)).toEqual([2, 1]);
    expect(D[0].on > D[1].on).toBe(true);
  });

  it("shows the vote notice only until voting closes", () => {
    expect(phaseOf(VOTE_ZAHRANI, Date.parse("2026-08-16T12:59:00+03:00"))).toBe("before");
    expect(phaseOf(VOTE_ZAHRANI, Date.parse("2026-08-16T14:00:00+03:00"))).toBe("during");
    expect(phaseOf(VOTE_ZAHRANI, Date.parse("2026-08-16T15:01:00+03:00"))).toBe("after");
    expect(activeNotice(zahrani, Date.parse("2026-10-26T12:00:00+03:00"))).toBeUndefined();
  });

  it("keeps the vote notice whole", () => {
    expect(VOTE_ZAHRANI.text.filter(b => b[0] === "li")).toHaveLength(11);
    expect(VOTE_ZAHRANI.text.some(b => b[0] === "proposal")).toBe(true);
    expect(JSON.stringify(VOTE_ZAHRANI)).not.toContain("proposal.pdf");
  });
});
