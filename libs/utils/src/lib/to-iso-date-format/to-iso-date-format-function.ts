export function toIsoDateFormat(date: string | Date): string {
  if (!date) {
    return '';
  }

  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}
