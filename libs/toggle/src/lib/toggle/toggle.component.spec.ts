/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { ToggleComponent } from './toggle.component';

const mockProjectContent = 'mockProjectContent';

describe('ToggleComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(ToggleComponent, {
        ngModule: {
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: mockProjectContent,
    });

    const nzSwitchSelector = 'nz-switch';
    const inputSelector = 'input[type=checkbox]';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render nz-switch component from Ant Design', async () => {
        const host = await createComponent({}, true);

        expect(host.queryCss(nzSwitchSelector)).toBeTruthy();
    });

    it('should render input type="checkbox" with style `display: none`', async () => {
        const host = await createComponent({}, true);
        const inputElem = host.queryCss(inputSelector);

        expect(inputElem).toBeTruthy();
        expect(inputElem!.nativeElement.style.display).toBe('none');
    });

    it('should render `ng-content` inside `.spy-toggle__label` wrapper element', async () => {
        const host = await createComponent({}, true);
        const labelWrapperElem = host.queryCss('.spy-toggle__label');

        expect(labelWrapperElem).toBeTruthy();
        expect(labelWrapperElem!.nativeElement.textContent).toContain(mockProjectContent);
    });

    describe('@Input(name)', () => {
        it('should bind to `name` attribute of input', async () => {
            const host = await createComponent({ name: 'mock-name' }, true);
            const inputElem = host.queryCss(inputSelector);

            expect(inputElem).toBeTruthy();
            expect(inputElem!.attributes.name).toBe('mock-name');
        });
    });

    describe('@Input(value)', () => {
        it('should bind to `ngModel` property of nz-switch', async () => {
            const host = await createComponent({ value: true }, true);
            const nzSwitchElem = host.queryCss(nzSwitchSelector);

            expect(nzSwitchElem).toBeTruthy();
            expect(nzSwitchElem!.properties.ngModel).toBe(true);
        });

        it('should bind to `ngModel` property of input', async () => {
            const host = await createComponent({ value: true }, true);
            const inputElem = host.queryCss(inputSelector);

            expect(inputElem).toBeTruthy();
            expect(inputElem!.properties.ngModel).toBe(true);
        });
    });

    describe('@Input(disabled)', () => {
        it('should bind disabled to nzDisabled of nz-switch', async () => {
            const host = await createComponent({ disabled: true }, true);
            const nzSwitchElem = host.queryCss(nzSwitchSelector);

            expect(nzSwitchElem).toBeTruthy();
            expect(nzSwitchElem!.properties.nzDisabled).toBe(true);
        });

        it('should bind `disabled` property of input', async () => {
            const host = await createComponent({ disabled: true }, true);
            const inputElem = host.queryCss(inputSelector);

            expect(inputElem).toBeTruthy();
            expect(inputElem!.properties.disabled).toBe(true);
        });
    });

    describe('@Output(valueChange)', () => {
        it('should emit when `ngModelChange` emits from nz-switch', async () => {
            const host = await createComponent({}, true);
            const nzSwitchElem = host.queryCss(nzSwitchSelector);

            expect(nzSwitchElem).toBeTruthy();

            nzSwitchElem!.triggerEventHandler('ngModelChange', 'value');
            host.detectChanges();

            expect(host.hostComponent.valueChange).toHaveBeenCalledWith('value');
        });
    });
});
