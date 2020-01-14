import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-render-tpl',
  template: `
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RenderTplComponent {
  @Input()
  template: TemplateRef<any>;
}
