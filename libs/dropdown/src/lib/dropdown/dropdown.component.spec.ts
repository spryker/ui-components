import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(DropdownComponent, {
        ngModule: {
            imports: [NzDropDownModule, NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    xit('template must render span and nz-dropdown-menu from Ant Design', async () => {
        const host = await createComponent({}, true);
        const spanElem = host.queryCss('span[nz-dropdown]');
        const nzDropdownElem = host.queryCss('nz-dropdown-menu');

        expect(spanElem).toBeTruthy();
        expect(nzDropdownElem).toBeTruthy();
    });

    describe('Inputs must be bound to span', () => {
        it('should bind placement to nzPlacement of nz-dropdown', async () => {
            const mockedValue = 'bottomLeft';
            const host = await createComponent({ placement: mockedValue }, true);
            const spanElem = host.queryCss('span[nz-dropdown]');

            expect(spanElem.attributes['ng-reflect-nz-placement']).toBe(mockedValue);
        });

        it('should bind disabled to nzDisabled of nz-dropdown', async () => {
            const host = await createComponent({ disabled: true }, true);
            const spanElem = host.queryCss('span[nz-dropdown]');

            expect(spanElem.attributes['ng-reflect-nz-disabled']).toBe('true');
        });

        it('should bind visible to nzVisible of nz-dropdown', async () => {
            const host = await createComponent({ visible: true }, true);
            const spanElem = host.queryCss('span[nz-dropdown]');

            expect(spanElem.attributes['ng-reflect-nz-visible']).toBe('true');
        });
    });

    it('visibleChange must be emitted every time nzVisibleChange emits with $event', async () => {
        const host = await createComponent({}, true);
        const spanElem = host.queryCss('span[nz-dropdown]');

        spanElem.triggerEventHandler('nzVisibleChange', false);
        host.detectChanges();

        expect(host.hostComponent.visibleChange).toHaveBeenCalledWith(false);
    });
});
