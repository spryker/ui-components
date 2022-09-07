import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { RadioModule } from '../radio.module';

@Component({
    selector: 'spy-test',
    template: `
        <spy-radio-group [value]="value" [name]="name" (selected)="selectedSpy($event)">
            <spy-radio [hasError]="true"></spy-radio>
            <spy-radio></spy-radio>
        </spy-radio-group>
    `,
})
class TestComponent {
    @Input() value: any;
    @Input() name: any;
    selectedSpy = jest.fn<boolean, any[]>();
}

describe('RadioGroupComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TestComponent, {
        ngModule: {
            imports: [RadioModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render `nz-radio-group`', async () => {
        const host = await createComponent({}, true);
        const radioGroupElem = host.queryCss('nz-radio-group');

        expect(radioGroupElem).toBeTruthy();
    });

    it('should bound @Input(value) to the input `ngModel` of `nz-radio-group` element', async () => {
        const mockValue = 'mockValue';
        const host = await createComponent({ value: mockValue }, true);
        const radioGroupElem = host.queryCss('nz-radio-group');

        expect(radioGroupElem.attributes['ng-reflect-model']).toBe(mockValue);
    });

    it('should add `spy-radio-group--selected` to the host if @Input(value) is not `undefined`', async () => {
        const mockValue = 'mockValue';
        const host = await createComponent({}, true);
        const radioGroupElem = host.queryCss('spy-radio-group');

        expect(radioGroupElem.classes['spy-radio-group--selected']).toBeFalsy();

        host.setInputs({ value: mockValue }, true);

        expect(radioGroupElem.classes['spy-radio-group--selected']).toBeTruthy();
    });

    it('should add `spy-radio-group--error` to the host if projected any `spy-radio` component has input `hasError` `true`', async () => {
        const host = await createComponent({}, true);
        const radioGroupElem = host.queryCss('spy-radio-group');

        expect(radioGroupElem.classes['spy-radio-group--error']).toBeTruthy();
    });

    it('should bound @Input(name) to the input `nzName` of `nz-radio-group` element', async () => {
        const mockName = 'mockName';
        const host = await createComponent({ name: mockName }, true);
        const radioGroupElem = host.queryCss('nz-radio-group');

        expect(radioGroupElem.attributes['ng-reflect-nz-name']).toBe(mockName);
    });

    it('should trigger `selected` callback when `ngModelChange` on `nz-radio-group` element was triggered', async () => {
        const mockValue = 'mockValue';
        const host = await createComponent({}, true);
        const radioGroupElem = host.queryCss('nz-radio-group');

        radioGroupElem.triggerEventHandler('ngModelChange', mockValue);
        host.detectChanges();

        expect(host.component.selectedSpy).toHaveBeenCalledWith(mockValue);
    });

    it('should render same amount of `spy-radio` elements as `spy-radio` projected components', async () => {
        const host = await createComponent({}, true);
        const radioGroupElem = host.queryCss('nz-radio-group');
        const radiosComponents = host.fixture.debugElement.queryAll(By.css('spy-radio'));

        expect(radioGroupElem.children.length).toBe(radiosComponents.length);
    });
});
