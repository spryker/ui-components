/**
 * Represents a duration as string where components are separated by a space
 *
 * Components:
 *  - 1-999d - Years
 *  - 1-12m - Months
 *  - 1-365d - Days
 *  - 1-23h - Hours
 *  - 1-59min - Minutes
 *  - 1-59s - Seconds
 *  - 1-59ms - Milliseconds
 *
 * Examples:
 *  - 2h 30m
 *  - 1d 14h
 *  - 2y
 */
export type TimeDurationString = string;

export interface TimeDurationData {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}
