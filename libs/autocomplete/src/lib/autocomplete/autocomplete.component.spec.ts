import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutocompleteWrapperToken } from '@spryker/utils';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
    let fixture: ComponentFixture<AutocompleteComponent>;
    let component: AutocompleteComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AutocompleteComponent],
            providers: [{ provide: AutocompleteWrapperToken, useValue: '' }],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <nz-autocomplete> element', () => {
        fixture = TestBed.createComponent(AutocompleteComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        const autocompleteElem = fixture.debugElement.query(By.css('nz-autocomplete'));
        expect(autocompleteElem).toBeTruthy();
    });

    it('should render <nz-auto-option> mapped from @Input(options)', () => {
        fixture = TestBed.createComponent(AutocompleteComponent);
        component = fixture.componentInstance;

        const mockOptions = [
            { value: 'Downing Street', title: 'Downing Street Title', isDisabled: true },
            { value: 'Wall Street', title: 'Wall Street Title' },
        ];

        fixture.componentRef.setInput('options', mockOptions);
        fixture.detectChanges();

        const optionDes = fixture.debugElement.queryAll(By.css('nz-auto-option'));
        expect(optionDes.length).toBe(mockOptions.length);

        optionDes.forEach((de, i) => {
            expect(de.properties.nzDisabled).toBe(mockOptions[i].isDisabled);
            expect(de.properties.nzValue).toBe(mockOptions[i].value);
            expect((de.nativeElement as HTMLElement).textContent).toContain(mockOptions[i].title);
        });
    });
});
