import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() spyTitle: string | TemplateRef<void> = '';
  @Input() extra: TemplateRef<void> | undefined;
  @Input() actions: TemplateRef<void>[] | undefined[] = [];
  @Input() titlePosition: 'left' | 'center' | 'right' = 'left';
}
