import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {
  @Input() tab = 0;
  @Input() card: 'line' | 'card' = 'line';

  @Output() tabChange = new EventEmitter<number>();

  activateTab(index: number): void {}

  toNextTab(): number {
    return this.currentActiveTab();
  }

  toPrevTab(): number {
    return this.currentActiveTab();
  }

  currentActiveTab(): number {
    return this.tab;
  }
}
