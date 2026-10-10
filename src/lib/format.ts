const bengaliDigits = "০১২৩৪৫৬৭৮৯";
const englishDigits = "0123456789";

export function toBengaliNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits })
    .format(value)
    .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
}

export function fromBengaliNumber(value: string) {
  return Number(
    value.replace(/[০-৯]/g, (digit) =>
      String(englishDigits.indexOf(digit)),
    ),
  );
}

export function formatPrice(value: number) {
  return toBengaliNumber(value);
}

export function formatPercent(value: number) {
  return toBengaliNumber(value, 1);
}

export function formatUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    pc: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}
