import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NzLayoutModule],
            declarations: [SidebarComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render trigger button', () => {
        const triggerButton = q('.ant-layout-sider-trigger');
        expect(triggerButton).toBeTruthy();
    });

    it('should render icon into the button', () => {
        const triggerButton = q('.ant-layout-sider-trigger');
        const iconComponent = triggerButton.query(By.css('spy-icon'));
        expect(iconComponent).toBeTruthy();
        expect(iconComponent.properties.name).toEqual('arrow-down');
    });

    it('should trigger sidebar', () => {
        const emitSpy = jest.spyOn(fixture.componentInstance.collapsedChange, 'emit');

        fixture.componentInstance.updateCollapse(true);
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalledWith(true);
        expect(fixture.componentInstance.collapsed).toBeTruthy();

        fixture.componentInstance.updateCollapse(false);
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalledWith(false);
        expect(fixture.componentInstance.collapsed).toBeFalsy();
    });
});
