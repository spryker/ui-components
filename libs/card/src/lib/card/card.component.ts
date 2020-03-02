import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
  ElementRef,
} from '@angular/core';
import { applyContexts } from '@spryker/utils';

@Component({
  selector: 'spy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() title: string | TemplateRef<void> = '';
  @Input() extra: TemplateRef<void> | undefined;
  @Input() actions: TemplateRef<void>[] | undefined[] = [];
  @Input() titlePosition: 'left' | 'center' | 'right' = 'left';

  constructor(elemRef: ElementRef) {
    applyContexts(<HTMLElement>elemRef.nativeElement);
  }
}
