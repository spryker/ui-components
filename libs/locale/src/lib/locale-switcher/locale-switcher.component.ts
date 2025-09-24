import { ChangeDetectionStrategy, Component, Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocaleService } from '../locale.service';

/**
 * @deprecated use `LocaleSwitcherComponent` instead.
 */
@Injectable()
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
export class LocaleSwitcherComponent implements OnInit, OnChanges {
    @Input() locale?: string;

    constructor(private localeService: LocaleService) {}

    ngOnInit(): void {
        if (this.locale) {
            this.setLocale(this.locale);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.locale && this.locale) {
            this.setLocale(this.locale);
        }
    }

    private setLocale(locale: string): void {
        this.localeService.setLocale(locale);
    }
}
