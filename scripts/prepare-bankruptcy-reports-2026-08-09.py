"""Prepare reviewed preview datasets for August and September 2026 from the supplied workbook.

Run: python3 scripts/prepare-bankruptcy-reports-2026-08-09.py <input.xlsx>
The source workbook, not an external article, is the sole data source. Duplicate
opening notices are preserved but counted once by (registration, case, procedure).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "client/src/data"
REQUIRED = {
    "المعرف", "اسم المدين", "رقم السجل/الهوية", "نوع الإجراء", "المحكمة",
    "نوع الإعلان", "سبب الافتتاح", "تاريخ الإعلان", "رابط التفاصيل", "رقم الدعوى",
}


def main(path: Path) -> None:
    df = pd.read_excel(path, dtype=str).fillna("")
    missing = REQUIRED - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")
    if df["المعرف"].duplicated().any():
        raise ValueError("Duplicate announcement IDs: investigate before generating reports")
    if not df["تاريخ الإعلان"].str.match(r"^2026-(08|09)-\d{2}$").all():
        raise ValueError("Source must contain only August/September 2026 dates")
    if not df["رابط التفاصيل"].str.startswith("https://bankruptcy.gov.sa/").all():
        raise ValueError("An official announcement URL is missing or unexpected")

    for month in ("08", "09"):
        subset = df[df["تاريخ الإعلان"].str.startswith(f"2026-{month}")].copy()
        subset = subset.sort_values(["تاريخ الإعلان", "المعرف"], ascending=False)
        # A later notice is the representative opening; earlier same-case notices remain visible.
        opening_keys = set()
        items = []
        for _, row in subset.iterrows():
            published_opening = row["نوع الإعلان"].startswith("افتتاح إجراء")
            transition = published_opening and row["سبب الافتتاح"] == "إنهاء إجراء التصفية"
            key = (row["رقم السجل/الهوية"] or row["اسم المدين"], row["رقم الدعوى"], row["نوع الإجراء"])
            duplicate = published_opening and not transition and bool(row["رقم الدعوى"]) and key in opening_keys
            if published_opening and not transition and not duplicate:
                opening_keys.add(key)
            bucket = "transition" if transition else "duplicate" if duplicate else "opening" if published_opening else "other"
            establishment = row.get("تاريخ التأسيس", "")
            age = None
            if establishment:
                days = (pd.to_datetime(row["تاريخ الإعلان"]) - pd.to_datetime(establishment)).days
                age = round(days / 365.2425, 2) if days >= 0 else None
            registration = row["رقم السجل/الهوية"]
            # July's public report withholds individuals' national identity numbers.
            if "*" in registration:
                registration = ""
            items.append({
                "id": row["المعرف"],
                "debtor": row["اسم المدين"],
                "registration": registration,
                "procedure": row["نوع الإجراء"],
                "court": row["المحكمة"],
                "announcementType": row["نوع الإعلان"],
                "openingReason": row["سبب الافتتاح"],
                "announcementDate": row["تاريخ الإعلان"],
                "officialUrl": row["رابط التفاصيل"],
                "bucket": bucket,
                "ageAtAnnouncement": age if bucket == "opening" else None,
                "officeManaged": "عبدالرحمن بن رضوان المشيقح" in row.get("الأمين", ""),
            })
        stats = {bucket: sum(x["bucket"] == bucket for x in items) for bucket in ("opening", "transition", "duplicate", "other")}
        assert sum(stats.values()) == len(items)
        expected = (71, 50, 2, 0, 19) if month == "08" else (53, 41, 0, 1, 11)
        assert (len(items), *stats.values()) == expected, (month, stats)
        output = OUT / f"bankruptcyReport2026{month}Reviewed.json"
        output.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{output}: {len(items)} total, {stats}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 scripts/prepare-bankruptcy-reports-2026-08-09.py <input.xlsx>")
    main(Path(sys.argv[1]))
