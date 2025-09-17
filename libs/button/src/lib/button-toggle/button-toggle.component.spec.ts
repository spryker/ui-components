import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonToggleComponent } from './button-toggle.component';

@Component({
    standalone: false,
    template: `
    <spy-button-toggle
      [attrs]="attrs"
      [disabled]="disabled"
      (toggledChange)="toggledChange($event)"
    >
      Content
    </spy-button-toggle>
  `,
})
class TestHostComponent {
    attrs?: Record<string, unknown>;
    disabled?: boolean;
    toggledChange = jest.fn();
}

describe('ButtonToggleComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonToggleComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render <spy-button-toggle>', () => {
        const el = fixture.debugElement.query(By.css('spy-button-toggle'));
        expect(el).toBeTruthy();
    });

    it('should render projected content inside <button>', () => {
        const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
        expect(btn.textContent).toMatch('Content');
    });

    it('should bind attrs to spyApplyAttrs properties of <button>', () => {
        const mockedAttrs = { mockAttr: 'mockAttr' };
        fixture.componentInstance.attrs = mockedAttrs;
        fixture.detectChanges();

        const btnDe = fixture.debugElement.query(By.css('button'));
        expect(btnDe.properties.spyApplyAttrs).toBe(mockedAttrs);
    });

    it('toggledChange must be emitted after click event happened on button', () => {
        const btnDe = fixture.debugElement.query(By.css('button'));
        btnDe.triggerEventHandler('click', {});
        fixture.detectChanges();

        expect(fixture.componentInstance.toggledChange).toHaveBeenCalledWith(true);
    });

    it('class `spy-btn-toggle--toggled` should be added after click event happened', () => {
        const btnDe = fixture.debugElement.query(By.css('button'));
        btnDe.triggerEventHandler('click', {});
        fixture.detectChanges();

        const btn = btnDe.nativeElement as HTMLButtonElement;
        expect(btn.classList.contains('spy-btn-toggle--toggled')).toBe(true);
    });

    describe('@Input(disabled)', () => {
        it('should by default have value `false`', () => {
            const cmp = fixture.debugElement.query(By.directive(ButtonToggleComponent)).componentInstance as ButtonToggleComponent;
            expect(cmp.disabled).toBe(false);
        });

        it('should bind to `disabled` of <button>', () => {
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();

            const btnDe = fixture.debugElement.query(By.css('button'));
            expect(btnDe.properties.disabled).toBe(true);
        });
    });
});
