import { booleanAttribute, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';
import { ToBoolean } from '@spryker/utils';

@Component({
    standalone: false,
    selector: 'spy-form-item',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormItemComponent implements OnInit, OnChanges {
    @Input() for: string | undefined;
    @Input() error: string | boolean | TemplateRef<{ $implicit: AbstractControl | NgModel }> = '';
    @Input() warning: string | TemplateRef<{ $implicit: AbstractControl | NgModel }> = '';
    @Input() hint: string | TemplateRef<{ $implicit: AbstractControl | NgModel }> = '';
    @Input({ transform: booleanAttribute }) required = false;
    @Input({ transform: booleanAttribute }) noSpaces = false;
    @Input({ transform: booleanAttribute }) noLabel = false;
    @Input({ transform: booleanAttribute }) withErrorTitle = false;
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

            return;
        }

        this.currentValidationStatus = '';
    }
}
