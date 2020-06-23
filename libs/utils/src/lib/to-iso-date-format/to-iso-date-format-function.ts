export function toIsoDateFormat(date: string | Date): string {
  if (!date) {
    return '';
  }

  return typeof date === 'object'
    ? date.toISOString()
    : new Date(date).toISOString();
}
