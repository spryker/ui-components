export function toIsoDateFormat(date: string | Date): string {
    return date instanceof Date ? localIsoTime(date) : localIsoTime(new Date(date));
}

function localIsoTime(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
}
