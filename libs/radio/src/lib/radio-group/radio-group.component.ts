import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { NzRadioComponent } from 'ng-zorro-antd/radio';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RadioComponent } from '../radio/radio.component';
import { RadioValue } from '../types';

@Component({
    selector: 'spy-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-radio-group',
        '[class.spy-radio-group--selected]': 'value',
        '[class.spy-radio-group--error]': 'hasError',
    },
})
export class RadioGroupComponent implements OnInit, OnDestroy {
    @Input() value?: RadioValue;
    @Input() name?: string;

    @Output() selected = new EventEmitter<boolean>();
    @ViewChildren(NzRadioComponent) nzRadios?: QueryList<NzRadioComponent>;

    hasError = false;

    radios$ = new BehaviorSubject(new Set<RadioComponent>());
    private destroyed$ = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.radios$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((radios) => (this.hasError = [...radios].some(({ hasError }) => hasError)));
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    valueChanged(prev: RadioValue) {
        if (this.value === prev) {
            this.value = undefined;
            this.selected.emit(this.value);
        }

        this.updateInputsValue();
    }

    select(option: string | RadioComponent): void {
        const radios = this.radios$.getValue();

        if (typeof option === 'string') {
            const isRealValue = [...radios].some(({ value }) => value === option);

            if (!isRealValue) {
                return;
            }

            this.value = option;
            this.cdr.detectChanges();

            return;
        }

        if (!radios.has(option)) {
            return;
        }

        this.value = option.value;
        this.cdr.detectChanges();
    }

    reset(): void {
        this.value = undefined;
        this.cdr.detectChanges();
    }

    registerRadio(component: RadioComponent) {
        const radios = this.radios$.getValue();

        if (radios.has(component)) {
            return;
        }

        radios.add(component);
        this.radios$.next(radios);

        setTimeout(() => {
            this.updateInputsValue();
        });
    }

    unregisterRadio(component: RadioComponent) {
        const radios = this.radios$.getValue();

        if (!radios.has(component)) {
            return;
        }

        radios.delete(component);
        this.radios$.next(radios);
    }

    private updateInputsValue(): void {
        const radios = [...this.radios$.getValue()];

        if (!radios) {
            return;
        }

        this.nzRadios?.map((item, index) => {
            const inputElement = item.inputElement;

            if (!inputElement) {
                return;
            }

            inputElement.nativeElement.value = radios[index].value ?? '';
        });
    }
}
