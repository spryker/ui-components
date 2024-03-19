import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(ToggleComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    const nzSwitchSelector = 'nz-switch';
    const inputSelector = 'input[type=checkbox]';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <nz-switch> element from Ant Design', async () => {
        const host = await createComponentWrapper(createComponent);

        expect(host.queryCss(nzSwitchSelector)).toBeTruthy();
    });

    it('should render input type="checkbox" with style `display: none`', async () => {
        const host = await createComponentWrapper(createComponent);
        const inputElem = host.queryCss(inputSelector);

        expect(inputElem).toBeTruthy();
        expect(inputElem.nativeElement.style.display).toBe('none');
    });

    it('should render `ng-content` inside `.spy-toggle__label` wrapper element', async () => {
        const host = await createComponentWrapper(createComponent);
        const labelWrapperElem = host.queryCss('.spy-toggle__label');

        expect(labelWrapperElem).toBeTruthy();
        expect(labelWrapperElem.nativeElement.textContent).toContain('Content');
    });

    describe('@Input(name)', () => {
        it('should bind to `name` attribute of input', async () => {
            const mockName = 'mock-name';
            const host = await createComponentWrapper(createComponent, { name: mockName });
            const inputElem = host.queryCss(inputSelector);

            expect(inputElem).toBeTruthy();
            expect(inputElem.attributes.name).toBe(mockName);
        });
    });

    describe('@Input(value)', () => {
        it('should bind to `ngModel` property of nz-switch', async () => {
            const host = await createComponentWrapper(createComponent, { value: true });
            const nzSwitchElem = host.queryCss(nzSwitchSelector);

            expect(nzSwitchElem).toBeTruthy();
            expect(nzSwitchElem.properties.ngModel).toBe(true);
        });

        it('should bind to `ngModel` property of input', async () => {
            const host = await createComponentWrapper(createComponent, { value: true });
            const inputElem = host.queryCss(inputSelector);

            expect(inputElem).toBeTruthy();
            expect(inputElem.properties.ngModel).toBe(true);
        });
    });

    describe('@Input(disabled)', () => {
        it('should bind disabled to nzDisabled of nz-switch', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const nzSwitchElem = host.queryCss(nzSwitchSelector);

            expect(nzSwitchElem).toBeTruthy();
            expect(nzSwitchElem.properties.nzDisabled).toBe(true);
        });

        it('should bind `disabled` property of input', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const inputElem = host.queryCss(inputSelector);

            expect(inputElem).toBeTruthy();
            expect(inputElem.properties.disabled).toBe(true);
        });
    });

    describe('@Output(valueChange)', () => {
        it('should emit when `ngModelChange` emits from nz-switch', async () => {
            const host = await createComponentWrapper(createComponent);
            const nzSwitchElem = host.queryCss(nzSwitchSelector);

            expect(nzSwitchElem).toBeTruthy();

            nzSwitchElem.triggerEventHandler('ngModelChange', 'value');
            host.detectChanges();

            expect(host.hostComponent.valueChange).toHaveBeenCalledWith('value');
        });
    });
});
