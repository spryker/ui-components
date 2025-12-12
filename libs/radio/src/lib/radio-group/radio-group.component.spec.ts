import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioModule } from '../radio.module';

@Component({
    standalone: false,
    selector: 'spy-test',
    template: `
        <spy-radio-group [value]="value" [name]="name" (selected)="selectedSpy($event)">
            <spy-radio [hasError]="true"></spy-radio>
            <spy-radio></spy-radio>
        </spy-radio-group>
    `,
})
class TestComponent {
    @Input() value: any;
    @Input() name: any;
    selectedSpy = jest.fn<boolean, any[]>();
}

describe('RadioGroupComponent', () => {
    let fixture: any;
    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qa = (css: string) => fixture.debugElement.queryAll(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [RadioModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should render <nz-radio-group>', () => {
        const radioGroupDe = q('nz-radio-group');
        expect(radioGroupDe).toBeTruthy();
    });

    it('should bound @Input(value) to the input `ngModel` of <nz-radio-group> element', () => {
        const mockValue = 'mockValue';
        fixture.componentRef.setInput('value', mockValue);
        fixture.detectChanges();

        const groupCmpDe = q('spy-radio-group');
        expect(groupCmpDe.componentInstance.value).toBe(mockValue);
    });

    it('should add `spy-radio-group--selected` to the host if @Input(value) is not `undefined`', () => {
        const hostEl: HTMLElement = q('spy-radio-group').nativeElement;
        expect(hostEl.classList.contains('spy-radio-group--selected')).toBe(false);

        fixture.componentRef.setInput('value', 'mockValue');
        fixture.detectChanges();

        expect(hostEl.classList.contains('spy-radio-group--selected')).toBe(true);
    });

    it('should add `spy-radio-group--error` to the host if projected any <spy-radio> element has input `hasError` `true`', () => {
        const hostEl: HTMLElement = q('spy-radio-group').nativeElement;
        expect(hostEl.classList.contains('spy-radio-group--error')).toBe(true);
    });

    it('should bound @Input(name) to the input `nzName` of <nz-radio-group> element', () => {
        const mockName = 'mockName';
        fixture.componentRef.setInput('name', mockName);
        fixture.detectChanges();

        const groupCmpDe = q('spy-radio-group');
        expect(groupCmpDe.componentInstance.name).toBe(mockName);
    });

    it('should trigger `selected` callback when `ngModelChange` on <nz-radio-group> element was triggered', () => {
        const radioGroupDe = q('nz-radio-group');

        radioGroupDe.triggerEventHandler('ngModelChange', 'mockValue');
        fixture.detectChanges();

        expect(fixture.componentInstance.selectedSpy).toHaveBeenCalledWith('mockValue');
    });

    it('should render same amount of <spy-radio> elements as <spy-radio> projected components', () => {
        const radiosRendered = qa('spy-radio');
        expect(radiosRendered.length).toBe(2);
    });
});
