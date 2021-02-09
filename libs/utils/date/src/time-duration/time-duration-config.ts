import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeDurationConfig {
  separator = ' ';
  yearToken = 'y';
  dayToken = 'd';
  hourToken = 'h';
  minuteToken = 'm';
  secondToken = 's';
  millisecondToken = 'ms';
}
