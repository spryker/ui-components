import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChipsComponent } from './chips.component';

@Component({
    standalone: false,
    template: `<spy-chips [color]="color" [maxWidth]="maxWidth"></spy-chips>`,
})
class TestHostComponent {
    @Input() color?: string;
    @Input() maxWidth?: string;
}

describe('ChipsComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ChipsComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('Input color should be bound to host element', () => {
        const mockedColor = 'red';
        fixture.componentInstance.color = mockedColor;
        fixture.detectChanges();

        const chipsDe = fixture.debugElement.query(By.css('spy-chips'));
        expect(chipsDe.properties['className']).toContain(mockedColor);
    });

    it('Input maxWidth should be bound to host element', () => {
        const mockedWidth = '200px';
        fixture.componentInstance.maxWidth = mockedWidth;
        fixture.detectChanges();

        const chipsDe = fixture.debugElement.query(By.css('spy-chips'));
        expect(chipsDe.styles['maxWidth']).toBe(mockedWidth);
    });
});
