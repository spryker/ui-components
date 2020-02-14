import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'spy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CardComponent {
  @Input() title: string | TemplateRef<void> = '';
  @Input() extra: TemplateRef<void> | undefined;
  @Input() actions: TemplateRef<void>[] | undefined[] = [];
  @Input() titlePosition: 'left' | 'center' | 'right' = 'left';
}
