import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'spy-form-item',
	templateUrl: './form-item.component.html',
	styleUrls: ['./form-item.component.less'],
})

export class FormItemComponent implements OnInit {
	@Input('for') inputId: string | undefined;
	@Input() error: string | TemplateRef<void> = '';
	@Input() hint: string | TemplateRef<void> = '';
	@Input() warning: string | TemplateRef<void> = '';
	validationStatuses: {
		[key: string]: string;
	} = {
		error: 'error',
		warning: 'warning',
		hint: 'validating'
	};
	currentValidationStatus: string = '';

	ngOnInit() {
		this.triggerValidationStatus();
	}

	triggerValidationStatus(): void {
		if (this.error) {
			this.currentValidationStatus = this.validationStatuses.error
		} else if (this.warning) {
			this.currentValidationStatus = this.validationStatuses.warning
		} if (this.hint) {
			this.currentValidationStatus = this.validationStatuses.hint
		}
	}

	isValidationMessageTemplateRef(message: string | TemplateRef<void>): boolean {
		return typeof message !== 'string';
	}
}
