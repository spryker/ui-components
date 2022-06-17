import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'spy-selected-option',
  templateUrl: './selected-option.component.html',
  styleUrls: ['./selected-option.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedOptionComponent {
  @ViewChild('contentTpl') template!: TemplateRef<void>;
}
