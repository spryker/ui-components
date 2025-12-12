import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TabComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TabComponent);
        fixture.detectChanges();
    });

    describe('component.hasWarningChange', () => {
        it('should emit hasWarning change on hasWarningChange', async () => {
            jest.spyOn(fixture.componentInstance.hasWarningChange, 'emit');
            fixture.componentRef.setInput('hasWarning', true);
            fixture.detectChanges();

            expect(fixture.componentInstance.hasWarningChange.emit).toHaveBeenCalledWith(true);
        });
    });
});
