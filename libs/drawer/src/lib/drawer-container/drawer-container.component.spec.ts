import { Component, Input, NO_ERRORS_SCHEMA, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';
import { DynamicIoModule } from 'ng-dynamic-component';
import { DrawerContainerComponent } from './drawer-container.component';

@Component({
    standalone: false,
    selector: 'spy-test',
    template: `
        <spy-drawer-container #drawerContainer></spy-drawer-container>
        <ng-template #drawerTpl let-drawerRef> Content </ng-template>
    `,
})
class TestComponent implements OnInit {
    @Input() closeable = false;
    @Input() width = '50%';
    @Input() resizable = false;

    @ViewChild('drawerContainer', { static: true }) drawerContainer!: DrawerContainerComponent;
    @ViewChild('drawerTpl', { static: true }) drawerTpl!: TemplateRef<any>;

    ngOnInit(): void {
        this.drawerContainer.openTemplate(this.drawerTpl, {
            closeable: this.closeable,
            width: this.width,
            hasBackdrop: false,
            closeOnBackdrop: false,
            resizable: this.resizable,
        });
    }
}

describe('DrawerContainerComponent', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DrawerContainerComponent, TestComponent],
            imports: [PortalModule, DynamicIoModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <spy-drawer-wrapper> element', () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const wrapperElem = fixture.debugElement.query(By.css('spy-drawer-wrapper'));
        expect(wrapperElem).toBeTruthy();
    });

    it('should bind @Input(closeable) to `closeable` of <spy-drawer-wrapper>', () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.closeable = true;
        fixture.detectChanges();

        const wrapperElem = fixture.debugElement.query(By.css('spy-drawer-wrapper'));
        expect(wrapperElem.properties.closeable).toBe(true);
    });

    it('should bind @Input(resizable) to `resizable` of <spy-drawer-wrapper>', () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.resizable = true;
        fixture.detectChanges();

        const wrapperElem = fixture.debugElement.query(By.css('spy-drawer-wrapper'));
        expect(wrapperElem.properties.resizable).toBe(true);
    });

    it('should bind @Input(width) to `width` of <spy-drawer-wrapper>', () => {
        fixture = TestBed.createComponent(TestComponent);
        const width = '30%';
        fixture.componentInstance.width = width;
        fixture.detectChanges();

        const wrapperElem = fixture.debugElement.query(By.css('spy-drawer-wrapper'));
        expect(wrapperElem.properties.width).toBe(width);
    });

    it('should render content inside `spy-drawer-wrapper__content` element as content projection', () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const wrapperElem = fixture.debugElement.query(By.css('spy-drawer-wrapper'));
        expect((wrapperElem.nativeElement as HTMLElement).textContent).toContain('Content');
    });
});
