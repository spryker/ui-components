import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RadioComponent } from '../radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';

@Component({
    selector: 'spy-test',
    template: `
        <spy-radio-group [value]="value" [name]="name" (selected)="selectedSpy($event)">
            <spy-radio [hasError]="true"></spy-radio>
            <spy-radio></spy-radio>
        </spy-radio-group>
    `,
})
class TestComponent {
    value: any;
    name: any;
    selectedSpy = jest.fn();
}

describe('RadioGroupComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, RadioComponent, RadioGroupComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should render `nz-radio-group`', () => {
        const radioGroupElem = fixture.debugElement.query(By.css('nz-radio-group'));

        expect(radioGroupElem).toBeTruthy();
    });

    it('should bound @Input(value) to the input `ngModel` of `nz-radio-group` element', () => {
        const mockValue = 'mockValue';
        const radioGroupElem = fixture.debugElement.query(By.css('nz-radio-group'));

        component.value = mockValue;
        fixture.detectChanges();

        expect(radioGroupElem.properties.ngModel).toBe(mockValue);
    });

    it('should add `spy-radio-group--selected` to the host if @Input(value) is not `undefined`', () => {
        const mockValue = 'mockValue';
        const radioGroupElem = fixture.debugElement.query(By.css('spy-radio-group'));

        expect('spy-radio-group--selected' in radioGroupElem.classes).toBeFalsy();

        component.value = mockValue;
        fixture.detectChanges();

        expect('spy-radio-group--selected' in radioGroupElem.classes).toBeTruthy();
    });

    it('should add `spy-radio-group--error` to the host if projected any `spy-radio` component has input `hasError` `true`', () => {
        const radioGroupElem = fixture.debugElement.query(By.css('spy-radio-group'));

        fixture.detectChanges();

        expect('spy-radio-group--error' in radioGroupElem.classes).toBeTruthy();
    });

    it('should bound @Input(name) to the input `nzName` of `nz-radio-group` element', () => {
        const mockName = 'mockName';
        const radioGroupElem = fixture.debugElement.query(By.css('nz-radio-group'));

        component.name = mockName;
        fixture.detectChanges();

        expect(radioGroupElem.properties.nzName).toBe(mockName);
    });

    it('should trigger `selected` callback when `ngModelChange` on `nz-radio-group` element was triggered', () => {
        const mockValue = 'mockValue';
        const radioGroupElem = fixture.debugElement.query(By.css('nz-radio-group'));

        radioGroupElem.triggerEventHandler('ngModelChange', mockValue);
        fixture.detectChanges();

        expect(component.selectedSpy).toHaveBeenCalledWith(mockValue);
    });

    it('should render same amount of `spy-radio` elements as `spy-radio` projected components', () => {
        const radiosComponents = fixture.debugElement.queryAll(By.css('spy-radio'));
        const radiosElems = fixture.debugElement.queryAll(By.css('.spy-radio'));

        expect(radiosElems.length).toBe(radiosComponents.length);
    });
});
