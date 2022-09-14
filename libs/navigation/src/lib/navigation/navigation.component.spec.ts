import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NavigationComponent } from './navigation.component';

const mockedData = [
    {
        title: 'Dashboard Dashboard Dashboard Dashboard Dashboard',
        url: '',
    },
    {
        title: 'Orders Orders Orders Orders Orders Orders Orders',
        url: '',
        icon: 'orders',
        isActive: false,
        subItems: [
            {
                title: 'Dashboard2',
                url: 'url',
            },
            {
                title: 'Dashboard2',
                url: 'url',
                icon: '',
                isActive: false,
                subItems: [],
            },
        ],
    },
];

describe('NavigationComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(NavigationComponent, {
        ngModule: {
            imports: [NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    describe('Component structure', () => {
        it('should render <ul> with `nz-menu` attribute', async () => {
            const host = await createComponentWrapper(createComponent);
            const ulElem = host.queryCss('ul');

            expect(ulElem).toBeTruthy();
            expect(ulElem.attributes['nz-menu']).toBeDefined();
        });

        it('should not render <li> with empty array `items` input', async () => {
            const host = await createComponentWrapper(createComponent);
            const liElem = host.queryCss('li');

            expect(liElem).toBeFalsy();
        });
    });

    describe('@Input(items)', () => {
        it('should render <li> with empty array `items` input', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockedData });
            const liElem = host.queryCss('li');

            expect(liElem).toBeTruthy();
        });

        it('should render <li> with `nz-menu` attribute with empty `subItems` array', async () => {
            const host = await createComponentWrapper(createComponent, { items: [mockedData[0]] });
            const liElem = host.queryCss('li');

            expect(liElem.attributes['nz-menu-item']).toBeDefined();
        });

        it('should render <li> with `nz-submenu` attribute with non empty `subItems` array', async () => {
            const host = await createComponentWrapper(createComponent, { items: [mockedData[1]] });
            const liElem = host.queryCss('li');

            expect(liElem.attributes['nz-submenu']).toBeDefined();
        });

        it('should render submenu with non empty `subItems` array', async () => {
            const host = await createComponentWrapper(createComponent, { items: [mockedData[1]] });
            const subElem = host.queryCss('li ul');

            expect(subElem).toBeTruthy();
        });

        it('should render <li> inside submenu with `nz-menu` attribute with empty `subItems` array', async () => {
            const host = await createComponentWrapper(createComponent, { items: [mockedData[1]] });
            const subLiElem = host.queryCss('li ul li');

            expect(subLiElem.attributes['nz-menu-item']).toBeDefined();
        });

        it('should render <li> correct amount', async () => {
            const host = await createComponentWrapper(createComponent, { items: [mockedData[1]] });
            const subLiElem = host.queryCss('li ul li');

            expect(subLiElem.attributes['nz-menu-item']).toBeDefined();
        });

        it('should update binding when changed', async () => {
            const host = await createComponentWrapper(createComponent, { items: [mockedData[0]] });
            const subLiElem = host.fixture.debugElement.queryAll(By.css('li'));

            expect(host.hostComponent.items.length).toBe(subLiElem.length);

            host.setInputs({ items: [mockedData[0], mockedData[0]] }, true);

            const updatedSubLiElem = host.fixture.debugElement.queryAll(By.css('li'));

            expect(host.hostComponent.items.length).toBe(updatedSubLiElem.length);
        });
    });

    describe('@Input(collapsed)', () => {
        it('should bind `nzInlineCollapsed` input of `nz-menu`', async () => {
            const host = await createComponentWrapper(createComponent, { collapsed: false });
            const ulElem = host.queryCss('ul[nz-menu]');

            expect(ulElem.properties.nzInlineCollapsed).toBe(false);
        });

        it('should update binding when changed', async () => {
            const host = await createComponentWrapper(createComponent, { collapsed: false });
            const ulElem = host.queryCss('ul[nz-menu]');

            expect(ulElem.properties.nzInlineCollapsed).toBe(false);

            host.setInputs({ collapsed: true }, true);

            expect(ulElem.properties.nzInlineCollapsed).toBe(true);
        });
    });

    describe('Component methods', () => {
        it('collapse() method should change the collapsed input to true', async () => {
            const host = await createComponentWrapper(createComponent, { collapsed: false });

            host.component.collapse();
            host.detectChanges();

            expect(host.component.collapsed).toBe(true);
        });

        it('expand() method should change the collapsed input to false', async () => {
            const host = await createComponentWrapper(createComponent, { collapsed: true });

            host.component.expand();
            host.detectChanges();

            expect(host.component.collapsed).toBe(false);
        });

        it('toggle() method should change the collapsed input to the opposite value', async () => {
            const host = await createComponentWrapper(createComponent, { collapsed: true });

            host.component.toggle();
            host.detectChanges();

            expect(host.component.collapsed).toBe(false);

            host.component.toggle();
            host.detectChanges();

            expect(host.component.collapsed).toBe(true);
        });
    });
});
