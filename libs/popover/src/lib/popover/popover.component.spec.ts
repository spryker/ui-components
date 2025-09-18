import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverComponent, PopoverPosition } from './popover.component';

describe('PopoverComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PopoverComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(PopoverComponent);
        fixture.detectChanges();
    });

    it('should render <spy-popover>', () => {
        const el = fixture.debugElement.query(By.css('span[nz-popover]'));
        expect(el).toBeTruthy();
    });

    it('should render <spy-popover> with changed position', () => {
        fixture.componentRef.setInput('position', PopoverPosition.Top);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('span[nz-popover]')).nativeNode.nzPopoverPlacement).toBe(
            PopoverPosition.Top,
        );
    });
});
