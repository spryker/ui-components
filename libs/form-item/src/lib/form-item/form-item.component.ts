import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';
import { ToBoolean } from '@spryker/utils';

@Component({
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
    @Input() @ToBoolean() required = false;
    @Input() @ToBoolean() noSpaces = false;
    @Input() @ToBoolean() noLabel = false;
    @Input() @ToBoolean() withErrorTitle = false;
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
