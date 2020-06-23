export function toIsoDateFormat(date: string | Date): string {
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}
