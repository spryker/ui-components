export function toIsoFormat(date: string | Date): string {
  return typeof date !== 'string'
    ? date.toISOString()
    : new Date(date).toISOString();
}
