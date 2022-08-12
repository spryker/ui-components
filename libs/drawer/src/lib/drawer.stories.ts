import { Component, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { Meta } from '@storybook/angular';
import { DrawerContainerProxyComponent } from './drawer-container/drawer-container-proxy.component';
import { DrawerModule } from './drawer.module';
import { DrawerService } from './drawer.service';
import { DrawerComponentInputs } from './drawer/drawer.component';
import { DrawerRef } from './drawer-ref';

@Component({
    selector: 'spy-story',
    template: `
        <p><button (click)="addDrawer(drawerTpl)">Add drawer</button></p>
        <p><button (click)="closeAll()">Close all</button></p>
        <p><button (click)="dispose()">Dispose</button></p>
        <ng-template #drawerTpl let-drawerRef>
            <h3>Drawer content here...</h3>
            <p><button (click)="drawerRef.close()">Close from inside</button></p>
            <p><button (click)="addDrawer(drawerTpl)">Add drawer</button></p>
            <p><button (click)="closeAll()">Close all</button></p>
        </ng-template>
    `,
})
class MultipleDrawersComponent {
    @Input() closeable = true;
    @Input() width = '50%';
    @Input() hasBackdrop = false;
    @Input() resizable = true;

    constructor(private drawerService: DrawerService) {}

    addDrawer(tplRef: TemplateRef<any>) {
        this.drawerService.openTemplate(tplRef, {
            closeable: this.closeable,
            width: this.width,
            hasBackdrop: this.hasBackdrop,
            resizable: this.resizable,
        });
    }

    closeAll() {
        this.drawerService.closeAll();
    }

    dispose() {
        this.drawerService.ngOnDestroy();
    }
}

@Component({
    selector: 'spy-story',
    template: `
        <spy-drawer
            [(isOpen)]="openDrawer"
            [closeable]="closeable"
            [resizable]="resizable"
            [width]="width"
            [hasBackdrop]="hasBackdrop"
        >
            <ng-template let-drawerRef>
                <h3>Drawer content here...</h3>

                <button (click)="drawerRef.close()">Close</button>
                <p><button (click)="drawerRef.maximize()">Maximize</button></p>
                <p><button (click)="drawerRef.minimize()">Minimize</button></p>
                <p>
                    <button (click)="drawerRef.refreshDrawer()">Refresh Drawer</button>
                </p>
            </ng-template>
        </spy-drawer>
        <button (click)="openDrawer = !openDrawer">Toggle drawer</button>
    `,
})
class SimpleDrawerComponent extends DrawerComponentInputs {
    openDrawer = false;
}

export default {
    title: 'DrawersComponent',
    component: SimpleDrawerComponent,
    parameters: {
        controls: {
            include: ['closeable', 'resizable', 'width', 'hasBackdrop'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8987',
            allowFullscreen: true,
        },
    },
    args: {
        closeable: true,
        resizable: true,
        width: '50%',
        hasBackdrop: false,
    },
} as Meta;

@Component({
    selector: 'spy-drawer-example-component',
    template: `
        <h1>Example Component</h1>
        <p>Input 1: {{ input1 }}</p>
        <p>Input 2: {{ input2 }}</p>
        <p>
            <button (click)="output1.emit('evt1')">Emit Event 1</button>
            <button (click)="output2.emit('evt2')">Emit Event 2</button>
        </p>
    `,
})
class DrawerExampleComponent {
    @Input() input1?: string;
    @Input() input2? = 'default';
    @Output() output1 = new EventEmitter<string>();
    @Output() output2 = new EventEmitter<string>();
}

@Component({
    selector: `spy-drawer-with-component`,
    template: `<button (click)="openDrawer()">Open Drawer</button>`,
})
class DrawerWithComponentComponent implements OnDestroy {
    private drawerRef?: DrawerRef;

    constructor(private drawerService: DrawerService) {}

    ngOnDestroy(): void {
        this.closeDrawer();
    }

    openDrawer() {
        this.closeDrawer();
        this.drawerRef = this.drawerService.openComponent(DrawerExampleComponent, {
            inputs: {
                input1: 'value1',
                input2: 'value2',
            },
            outputs: {
                output1: (evt) => console.log(`Got output 1: ${evt}`),
                output2: (evt) => console.log(`Got output 2: ${evt}`),
            },
        });
    }

    private closeDrawer() {
        this.drawerRef?.close();
        this.drawerRef = undefined;
    }
}

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [DrawerModule],
        entryComponents: [DrawerContainerProxyComponent],
    },
});

export const withMultipleDrawers = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [DrawerModule],
        entryComponents: [DrawerContainerProxyComponent],
    },
    component: MultipleDrawersComponent,
});

export const withComponent = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [DrawerModule],
        declarations: [DrawerExampleComponent],
        entryComponents: [DrawerContainerProxyComponent, DrawerExampleComponent],
    },
    component: DrawerWithComponentComponent,
});
withComponent.argTypes = {
    closeable: {
        table: {
            disable: true,
        },
    },
    resizable: {
        table: {
            disable: true,
        },
    },
    width: {
        table: {
            disable: true,
        },
    },
    hasBackdrop: {
        table: {
            disable: true,
        },
    },
};
