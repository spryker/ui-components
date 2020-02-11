import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'spy-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.less'],
})
export class FormItemComponent implements OnInit, OnChanges {
  @Input() for: string | undefined;
  @Input() error: string | TemplateRef<void> = '';
  @Input() warning: string | TemplateRef<void> = '';
  @Input() hint: string | TemplateRef<void> = '';
  validationStatuses: {
    [key: string]: string;
  } = {
    error: 'error',
    warning: 'warning',
    hint: 'validating',
  };
  currentValidationStatus: string = '';

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
      this.currentValidationStatus = this.validationStatuses.error;

      return;
    }

    if (this.warning) {
      this.currentValidationStatus = this.validationStatuses.warning;

      return;
    }

    if (this.hint) {
      this.currentValidationStatus = this.validationStatuses.hint;
    }
  }
}
