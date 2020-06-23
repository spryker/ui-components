export function toIsoFormat(date?: string | Date): string | undefined {
  if (!date) {
    return date;
  }

  return typeof date !== 'string'
    ? date.toISOString()
    : new Date(date).toISOString();
}
