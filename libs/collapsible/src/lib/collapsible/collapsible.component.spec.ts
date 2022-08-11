import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { CollapsibleComponent } from './collapsible.component';

describe('CollapsibleComponent', () => {
    let component: CollapsibleComponent;
    let fixture: ComponentFixture<CollapsibleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NzCollapseModule, NoopAnimationsModule],
            declarations: [CollapsibleComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollapsibleComponent);
        component = fixture.componentInstance;
        component.titleIcon = 'title-icon';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('template must render nz-collapse-panel from Ant Design inside nz-collapse component', () => {
        const collapseElem = fixture.debugElement.query(By.css('nz-collapse'));
        expect(collapseElem).toBeTruthy();

        const panelElem = collapseElem.query(By.css('nz-collapse-panel'));
        expect(panelElem).toBeTruthy();
    });

    it('should render icon component', () => {
        const collapsibleHeaderElem = fixture.debugElement.query(By.css('.ant-collapse-header'));
        const headerIcon = collapsibleHeaderElem.query(By.css('spy-icon'));

        expect(headerIcon).toBeTruthy();
        expect(headerIcon.properties.name).toBe('title-icon');
    });

    describe('Toggling functionality', () => {
        it('Should change active on opposite by toggle method', () => {
            component.toggle();
            fixture.detectChanges();

            expect(component.active).toBeTruthy();

            component.toggle();
            fixture.detectChanges();

            expect(component.active).toBeFalsy();
        });

        it('Should emit event on collapsible header click', () => {
            const collapsibleHeaderElem = fixture.debugElement.query(By.css('.ant-collapse-header'));
            const callback = jest.fn();

            component.activeChange.subscribe(callback);
            collapsibleHeaderElem.triggerEventHandler('click', null);

            fixture.detectChanges();
            expect(callback).toHaveBeenCalledWith(true);

            collapsibleHeaderElem.triggerEventHandler('click', null);

            fixture.detectChanges();
            expect(callback).toHaveBeenCalledWith(false);
        });
    });
});
