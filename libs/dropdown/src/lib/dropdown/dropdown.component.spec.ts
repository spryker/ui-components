import { TestBed } from '@angular/core/testing';
import { Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { DropdownComponent } from './dropdown.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'nz-dropdown-menu',
    exportAs: 'nzDropdownMenu',
})
class MockNzDropDown { }

describe('DropdownComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(DropdownComponent, {
        ngModule: {
            declarations: [MockNzDropDown],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('template must render span and nz-dropdown-menu from Ant Design', async () => {
        const host = await createComponentWrapper(createComponent);
        const spanElem = host.queryCss('span[nz-dropdown]');
        const nzDropdownElem = host.queryCss('nz-dropdown-menu');

        expect(spanElem).toBeTruthy();
        expect(nzDropdownElem).toBeTruthy();
    });

    describe('Inputs must be bound to span', () => {
        it('should bind placement to nzPlacement of nz-dropdown', async () => {
            const mockedValue = 'bottomLeft';
            const host = await createComponentWrapper(createComponent, { placement: mockedValue });
            const spanElem = host.queryCss('span[nz-dropdown]');

            expect(spanElem.properties.nzPlacement).toBe(mockedValue);
        });

        it('should bind disabled to nzDisabled of nz-dropdown', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const spanElem = host.queryCss('span[nz-dropdown]');

            expect(spanElem.properties.nzDisabled).toBe(true);
        });

        it('should bind trigger to nzTrigger of nz-dropdown', () => {
            const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));

            const mockedValue = 'hover';
            component.trigger = mockedValue;

            fixture.detectChanges();
            expect(spanElem.attributes['ng-reflect-nz-trigger']).toBe(mockedValue);
        });
    });

    it('should bind visible to nzVisible of nz-dropdown', async () => {
        const host = await createComponentWrapper(createComponent, { visible: true });
        const spanElem = host.queryCss('span[nz-dropdown]');

        expect(spanElem.properties.nzVisible).toBe(true);
    });
});

it('visibleChange must be emitted every time nzVisibleChange emits with $event', async () => {
    const host = await createComponentWrapper(createComponent);
    const spanElem = host.queryCss('span[nz-dropdown]');

    spanElem.triggerEventHandler('nzVisibleChange', false);
    host.detectChanges();

    expect(host.hostComponent.visibleChange).toHaveBeenCalledWith(false);
});
});
