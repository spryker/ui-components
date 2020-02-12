import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'spy-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LogoComponent implements OnChanges {
  @Input() size: 'full' | 'icon' = 'full';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.size) {
      this.size = changes.size.currentValue;
    }
  }
}
