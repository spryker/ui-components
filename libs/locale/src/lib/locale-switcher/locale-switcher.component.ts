import { ChangeDetectionStrategy, Component, Directive, Input, OnChanges, OnInit } from '@angular/core';
import { TypedSimpleChanges } from '@spryker/utils';
import { LocaleService } from '../locale.service';

@Directive({
    selector: '[spyLocaleSwitcherInputs]',
})
export class LocaleSwitcherInputs {
    @Input() locale?: string;
}

@Component({
    selector: 'spy-locale-switcher',
    templateUrl: './locale-switcher.component.html',
    styleUrls: ['./locale-switcher.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style: 'display: none' },
})
export class LocaleSwitcherComponent extends LocaleSwitcherInputs implements OnInit, OnChanges {
    constructor(private localeService: LocaleService) {
        super();
    }

    ngOnInit(): void {
        if (this.locale) {
            this.setLocale(this.locale);
        }
    }

    ngOnChanges(changes: TypedSimpleChanges<LocaleSwitcherInputs>): void {
        if (changes.locale && this.locale) {
            this.setLocale(this.locale);
        }
    }

    private setLocale(locale: string): void {
        this.localeService.setLocale(locale);
    }
}
