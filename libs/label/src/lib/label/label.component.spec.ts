import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LabelComponent } from './label.component';

@Component({
    standalone: false,
    template: `<spy-label [for]="for">Content</spy-label>`,
})
class HostComponent {
    @Input() for?: string;
}

describe('LabelComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LabelComponent, HostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should render label', () => {
        const labelDe = fixture.debugElement.query(By.css('label'));
        expect(labelDe).toBeTruthy();
    });

    it('should bound input for to label', () => {
        fixture.componentRef.setInput('for', 'id');
        fixture.detectChanges();

        const labelDe = fixture.debugElement.query(By.css('label'));
        expect(labelDe.properties.htmlFor).toBe('id');
    });

    it('should project content inside label', () => {
        const labelDe = fixture.debugElement.query(By.css('label'));
        expect(labelDe.nativeElement.textContent).toMatch('Content');
    });
});
