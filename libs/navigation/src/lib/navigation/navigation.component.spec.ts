import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
            { title: 'Dashboard2', url: 'url' },
            { title: 'Dashboard2', url: 'url', icon: '', isActive: false, subItems: [] },
        ],
    },
];

@Component({
    standalone: false,
    template: `
        <spy-navigation
            [items]="items"
            [collapsed]="collapsed"
            (collapsedChange)="onCollapsedChange($event)"
        ></spy-navigation>
    `,
})
class HostComponent {
    @Input() items: any[] = [];
    @Input() collapsed = false;
    onCollapsedChange = jest.fn();
}

describe('NavigationComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavigationComponent, HostComponent],
            imports: [NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qa = (css: string) => fixture.debugElement.queryAll(By.css(css));
    const navDe = () => fixture.debugElement.query(By.directive(NavigationComponent));
    const navCmp = () => navDe().componentInstance as NavigationComponent;

    describe('Component structure', () => {
        it('should render <ul> with `nz-menu` attribute', () => {
            const ul = q('ul');
            expect(ul).toBeTruthy();
            expect(ul.attributes['nz-menu']).toBeDefined();
        });

        it('should not render <li> with empty array `items` input', () => {
            const li = q('li');
            expect(li).toBeFalsy();
        });
    });

    describe('@Input(items)', () => {
        it('should render <li> with empty array `items` input', () => {
            fixture.componentRef.setInput('items', mockedData);
            fixture.detectChanges();

            const li = q('li');
            expect(li).toBeTruthy();
        });

        it('should render <li> with `nz-menu` attribute with empty `subItems` array', () => {
            fixture.componentRef.setInput('items', [mockedData[0]]);
            fixture.detectChanges();

            const li = q('li');
            expect(li.attributes['nz-menu-item']).toBeDefined();
        });

        it('should render <li> with `nz-submenu` attribute with non empty `subItems` array', () => {
            fixture.componentRef.setInput('items', [mockedData[1]]);
            fixture.detectChanges();

            const li = q('li');
            expect(li.attributes['nz-submenu']).toBeDefined();
        });

        it('should render submenu with non empty `subItems` array', () => {
            fixture.componentRef.setInput('items', [mockedData[1]]);
            fixture.detectChanges();

            const subUl = q('li ul');
            expect(subUl).toBeTruthy();
        });

        it('should render <li> inside submenu with `nz-menu` attribute with empty `subItems` array', () => {
            fixture.componentRef.setInput('items', [mockedData[1]]);
            fixture.detectChanges();

            const subLi = q('li ul li');
            expect(subLi.attributes['nz-menu-item']).toBeDefined();
        });

        it('should render <li> correct amount', () => {
            fixture.componentRef.setInput('items', [mockedData[1]]);
            fixture.detectChanges();

            const allLi = qa('li');
            expect(allLi.length).toBeGreaterThan(0);
        });

        it('should update binding when changed', () => {
            fixture.componentRef.setInput('items', [mockedData[0]]);
            fixture.detectChanges();

            let liList = qa('li');
            expect((fixture.componentInstance as HostComponent).items.length).toBe(liList.length);

            fixture.componentRef.setInput('items', [mockedData[0], mockedData[0]]);
            fixture.detectChanges();

            liList = qa('li');
            expect((fixture.componentInstance as HostComponent).items.length).toBe(liList.length);
        });
    });

    describe('@Input(collapsed)', () => {
        it('should bind `nzInlineCollapsed` input of `nz-menu`', () => {
            fixture.componentRef.setInput('collapsed', false);
            fixture.detectChanges();

            const ul = q('ul[nz-menu]');
            expect(ul.properties.nzInlineCollapsed).toBe(false);
        });

        it('should update binding when changed', () => {
            fixture.componentRef.setInput('collapsed', false);
            fixture.detectChanges();

            let ul = q('ul[nz-menu]');
            expect(ul.properties.nzInlineCollapsed).toBe(false);

            fixture.componentRef.setInput('collapsed', true);
            fixture.detectChanges();

            ul = q('ul[nz-menu]');
            expect(ul.properties.nzInlineCollapsed).toBe(true);
        });
    });

    describe('Component methods', () => {
        it('collapse() method should change the collapsed input to true', () => {
            fixture.componentRef.setInput('collapsed', false);
            fixture.detectChanges();

            navCmp().collapse();
            fixture.detectChanges();

            expect(navCmp().collapsed).toBe(true);
        });

        it('expand() method should change the collapsed input to false', () => {
            fixture.componentRef.setInput('collapsed', true);
            fixture.detectChanges();

            navCmp().expand();
            fixture.detectChanges();

            expect(navCmp().collapsed).toBe(false);
        });

        it('toggle() method should change the collapsed input to the opposite value', () => {
            fixture.componentRef.setInput('collapsed', true);
            fixture.detectChanges();

            navCmp().toggle();
            fixture.detectChanges();

            expect(navCmp().collapsed).toBe(false);

            navCmp().toggle();
            fixture.detectChanges();

            expect(navCmp().collapsed).toBe(true);
        });
    });
});
