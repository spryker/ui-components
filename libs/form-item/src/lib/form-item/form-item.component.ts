import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class FormItemComponent implements OnInit, OnChanges {
  @Input() for: string | undefined;
  @Input() error: string | TemplateRef<void> = '';
  @Input() warning: string | TemplateRef<void> = '';
  @Input() hint: string | TemplateRef<void> = '';
  currentValidationStatus = '';

  ngOnInit() {
    this.updateValidationStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.error || changes.warning || changes.hint) {
      this.updateValidationStatus();
    }
  }

  updateValidationStatus(): void {
    if (this.error) {
      this.currentValidationStatus = 'error';

      return;
    }

    if (this.warning) {
      this.currentValidationStatus = 'warning';

      return;
    }

    if (this.hint) {
      this.currentValidationStatus = 'validating';
    }
  }
}
