import { PortalModule } from '@angular/cdk/portal';
import { Component, Input, NO_ERRORS_SCHEMA, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { createComponentWrapper } from '@spryker/internal-utils';
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

    @ViewChild('drawerContainer', { static: true })
    drawerContainer!: DrawerContainerComponent;

    @ViewChild('drawerTpl', { static: true })
    drawerTpl!: TemplateRef<any>;

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
    const { testModule, createComponent } = getTestingForComponent(TestComponent, {
        ngModule: {
            imports: [PortalModule, DynamicIoModule],
            declarations: [TestComponent, DrawerContainerComponent],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: 'Content',
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <spy-drawer-wrapper> element', async () => {
        const host = await createComponentWrapper(createComponent);
        const wrapperElem = host.queryCss('spy-drawer-wrapper');

        expect(wrapperElem).toBeTruthy();
    });

    it('should bind @Input(closeable) to `closeable` of <spy-drawer-wrapper>', async () => {
        const host = await createComponentWrapper(createComponent, { closeable: true });
        const wrapperElem = host.queryCss('spy-drawer-wrapper');

        expect(wrapperElem.properties.closeable).toBe(true);
    });

    it('should bind @Input(resizable) to `resizable` of <spy-drawer-wrapper>', async () => {
        const host = await createComponentWrapper(createComponent, { resizable: true });
        const wrapperElem = host.queryCss('spy-drawer-wrapper');

        expect(wrapperElem.properties.resizable).toBe(true);
    });

    it('should bind @Input(width) to `width` of <spy-drawer-wrapper>', async () => {
        const width = '30%';
        const host = await createComponentWrapper(createComponent, { width: width });
        const wrapperElem = host.queryCss('spy-drawer-wrapper');

        expect(wrapperElem.properties.width).toBe(width);
    });

    it('should render content inside `spy-drawer-wrapper__content` element as content projection', async () => {
        const host = await createComponentWrapper(createComponent);
        const wrapperElem = host.queryCss('spy-drawer-wrapper');

        expect(wrapperElem.nativeElement.textContent).toContain('Content');
    });
});
