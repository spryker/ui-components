export interface DateAdapterOperators {
    years(date: Date, years: number): Date;
    months(date: Date, months: number): Date;
    days(date: Date, days: number): Date;
    hours(date: Date, hours: number): Date;
    minutes(date: Date, minutes: number): Date;
    seconds(date: Date, seconds: number): Date;
    milliseconds(date: Date, ms: number): Date;
}

export interface DateOperations {
    add: DateAdapterOperators;
    sub: DateAdapterOperators;
}

export interface DateAdapter extends DateOperations {
    parse(date: string): Date;
}
