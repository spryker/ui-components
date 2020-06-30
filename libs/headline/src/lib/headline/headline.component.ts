import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-headline',
  },
})
export class HeadlineComponent {}
