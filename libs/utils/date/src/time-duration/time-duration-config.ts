import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeDurationConfig {
  separator = ' ';
  yearToken = 'y';
  monthToken = 'm';
  dayToken = 'd';
  hourToken = 'h';
  minuteToken = 'min';
  secondToken = 's';
  millisecondToken = 'ms';
}
