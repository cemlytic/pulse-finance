export interface DateRange {
  startDate: string;
  endDate: string;
}

export function lastNDays(days: number): DateRange {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}
