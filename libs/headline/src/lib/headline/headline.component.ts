import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
} from '@angular/core';

export type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'base';

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
export class HeadlineComponent {
  @Input() level: Level = 'h1';
}
