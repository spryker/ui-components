import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutocompleteWrapperToken } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(AutocompleteComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [{ provide: AutocompleteWrapperToken, useValue: '' }],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <nz-autocomplete> element', async () => {
        const host = await createComponentWrapper(createComponent);
        const autocompleteElem = host.queryCss('nz-autocomplete');

        expect(autocompleteElem).toBeTruthy();
    });

    it('should render <nz-auto-option> mapped from @Input(options)', async () => {
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
        const host = await createComponentWrapper(createComponent, { options: mockOptions });
        const autocompleteOptionElems = host.fixture.debugElement.queryAll(By.css('nz-auto-option'));

        expect(autocompleteOptionElems.length).toBe(mockOptions.length);
        autocompleteOptionElems.forEach((elem, index) => {
            expect(elem.properties.nzDisabled).toBe(mockOptions[index].isDisabled);
            expect(elem.properties.nzValue).toBe(mockOptions[index].value);
            expect(elem.nativeElement.textContent).toContain(mockOptions[index].title);
        });
    });
});
