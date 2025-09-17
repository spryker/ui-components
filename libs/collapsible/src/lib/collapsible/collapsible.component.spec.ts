import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CollapsibleComponent } from './collapsible.component';

describe('CollapsibleComponent', () => {
    let fixture: ComponentFixture<CollapsibleComponent>;
    let component: CollapsibleComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NzCollapseModule, NoopAnimationsModule],
            declarations: [CollapsibleComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(CollapsibleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('template must render nz-collapse-panel inside nz-collapse', () => {
        const collapseElem = fixture.debugElement.query(By.css('nz-collapse'));
        expect(collapseElem).toBeTruthy();

        const panelElem = fixture.debugElement.query(By.css('nz-collapse-panel'));
        expect(panelElem).toBeTruthy();
    });

    it('should render icon component', () => {
        const mockTitle = 'title-icon';
        fixture.componentRef.setInput('titleIcon', mockTitle);
        fixture.detectChanges();

        const headerDe = fixture.debugElement.query(By.css('.ant-collapse-header'));
        const headerIcon = headerDe.query(By.css('spy-icon'));
        expect(headerIcon).toBeTruthy();
        expect(headerIcon.properties['name']).toBe(mockTitle);
    });

    describe('Toggling functionality', () => {
        it('should change active by toggle()', () => {
            component.toggle();
            fixture.detectChanges();
            expect(component.active).toBe(true);

            component.toggle();
            fixture.detectChanges();
            expect(component.active).toBe(false);
        });

        it('should emit event on collapsible header click', () => {
            const callback = jest.fn();
            component.activeChange.subscribe(callback);

            const header = fixture.debugElement.query(By.css('.ant-collapse-header'));
            (header.nativeElement as HTMLElement).click();
            fixture.detectChanges();
            expect(callback).toHaveBeenCalledWith(true);

            (header.nativeElement as HTMLElement).click();
            fixture.detectChanges();
            expect(callback).toHaveBeenCalledWith(false);
        });

        it('should emit event via updateActive()', () => {
            const callback = jest.fn();
            component.activeChange.subscribe(callback);

            component.updateActive(true);
            fixture.detectChanges();
            expect(callback).toHaveBeenCalledWith(true);

            component.updateActive(false);
            fixture.detectChanges();
            expect(callback).toHaveBeenCalledWith(false);
        });
    });
});
