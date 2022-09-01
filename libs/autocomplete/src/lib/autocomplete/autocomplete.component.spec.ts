import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutocompleteWrapperToken } from '@spryker/utils';

import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
    let component: AutocompleteComponent;
    let fixture: ComponentFixture<AutocompleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutocompleteComponent],
            providers: [{ provide: AutocompleteWrapperToken, useValue: '' }],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutocompleteComponent);
        component = fixture.componentInstance;
    });

    it('should render `nz-autocomplete` component', () => {
        const autocompleteElem = fixture.debugElement.query(By.css('nz-autocomplete'));

        expect(autocompleteElem).toBeTruthy();
    });

    it('should render `nz-auto-option` mapped from @Input(options)', () => {
        const mockOptions = [
            {
                value: 'Downing Street',
                title: 'Downing Street Title',
                isDisabled: true,
            },
            {
                value: 'Wall Street',
                title: 'Wall Street Title',
            },
        ];

        component.options = mockOptions;
        fixture.detectChanges();

        const autocompleteOptionElems = fixture.debugElement.queryAll(By.css('nz-auto-option'));

        expect(autocompleteOptionElems.length).toBe(mockOptions.length);

        autocompleteOptionElems.forEach((elem, index) => {
            expect(elem.properties?.nzDisabled).toBe(mockOptions[index].isDisabled);
            expect(elem.properties?.nzValue).toBe(mockOptions[index].value);
            expect(elem.nativeElement.textContent).toContain(mockOptions[index].title);
        });
    });
});
