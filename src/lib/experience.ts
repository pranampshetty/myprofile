/** Full-time experience is counted from March 2023. */
export const FULL_TIME_START = new Date(2023, 2, 1);

export function getExperienceYears(asOf = new Date()): string {
  const months =
    (asOf.getFullYear() - FULL_TIME_START.getFullYear()) * 12 +
    (asOf.getMonth() - FULL_TIME_START.getMonth()) +
    (asOf.getDate() >= FULL_TIME_START.getDate() ? 0 : -1);

  const years = Math.floor(months / 12);

  if (years < 1) {
    return `${Math.max(months, 1)}`;
  }

  return `${years}+`;
}
