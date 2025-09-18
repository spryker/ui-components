import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner.component';
import { SpinnerSize } from '../types';

@Component({
    selector: 'spy-spinner-host',
    template: `
        <spy-spinner [delay]="delay" [size]="size" [isSpinning]="isSpinning" [overlayContent]="overlayContent">
            Content
        </spy-spinner>
    `,
    standalone: false,
})
class HostComponent {
    delay = 100;
    size = SpinnerSize.Large;
    isSpinning = true;
    overlayContent = true;
}

describe('SpinnerComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpinnerComponent, HostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should render spinner with special inputs properties', () => {
        fixture.componentRef.setInput('delay', 100);
        fixture.componentRef.setInput('size', SpinnerSize.Large);
        fixture.componentRef.setInput('isSpinning', true);
        fixture.componentRef.setInput('overlayContent', true);
        fixture.detectChanges();

        const spinDe = q('spy-spinner nz-spin');
        expect(spinDe).toBeTruthy();
        expect(spinDe.nativeNode.nzDelay).toBe(100);
        expect(spinDe.nativeNode.nzSize).toBe(SpinnerSize.Large);
        expect(spinDe.nativeNode.nzSpinning).toBe(true);
        expect(spinDe.nativeNode.nzSimple).toBe(true);
    });

    it('should render spinner content', () => {
        const spinDe = q('spy-spinner nz-spin');
        expect(spinDe).toBeTruthy();
        expect(spinDe.nativeElement.textContent).toContain('Content');
    });
});
