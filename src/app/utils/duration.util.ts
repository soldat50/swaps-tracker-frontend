export function calculateDurationInYears(
  startDate: Date,
  endDate: Date
): number {
  const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;

  return (
    (endDate.getTime() - startDate.getTime()) /
    millisecondsPerYear
  );
}
