export interface EnableDateRange {
    from?: Date | string;
    to?: Date | string;
}

export interface EnableDate extends EnableDateRange {
    onlyWorkDays?: boolean;
}

export interface EnableTime extends EnableDateRange {
    onlyWorkHours?: boolean;
}

export interface EnableTimeConfig {
    hours: () => number[];
    minutes: (hour?: number) => number[];
}

export type EnableDateOptions = EnableDate | EnableDateFunction;
export type EnableTimeOptions = EnableTime | EnableTimeFunction;
export type EnableDateFunction = (current: Date) => boolean;
export type EnableTimeFunction<C = EnableTimeConfig> = (current: Date) => C;
export type DateWorkDays = number[];
export type DateHoursPair = [number, number]; // [hours, minutes]
export type DateWorkHours = [DateHoursPair, DateHoursPair][]; // [from, to][]
