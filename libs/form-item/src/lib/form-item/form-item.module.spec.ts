import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { FormItemComponent } from './form-item.component';

describe('FormItemModule', () => {
  let component: FormItemComponent;
  let fixture: ComponentFixture<FormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, OfTypePipeModule],
      declarations: [FormItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('template must render as a tree [nz-form-item]=>[nz-form-label,nz-form-control]', () => {
    const formItemElem = fixture.debugElement.query(By.css('nz-form-item'));
    expect(formItemElem).toBeTruthy();

    const formLabelElem = formItemElem.query(By.css('nz-form-label'));
    const formControlElem = formItemElem.query(By.css('nz-form-control'));
    expect(formLabelElem).toBeTruthy();
    expect(formControlElem).toBeTruthy();
  });

  it('input nzNoColon must be set to true on nz-form-label', () => {
    const labelComponent = fixture.debugElement.query(By.css('nz-form-label'));
    fixture.detectChanges();
    expect(labelComponent.properties.nzNoColon).toBe(true);
  });

  it('should show error validation message', () => {
    component.error = 'Error Message';

    component.ngOnChanges({
      error: new SimpleChange('', 'Error Message', true),
    });

    fixture.detectChanges();
    expect(component.currentValidationStatus).toEqual('error');
  });

  it('should show warning validation message', () => {
    component.warning = 'Warning Message';

    component.ngOnChanges({
      warning: new SimpleChange('', 'Warning Message', true),
    });

    fixture.detectChanges();
    expect(component.currentValidationStatus).toEqual('warning');
  });

  it('should show hint validation message', () => {
    component.hint = 'Hint Message';

    component.ngOnChanges({
      hint: new SimpleChange('', 'Hint Message', true),
    });

    fixture.detectChanges();
    expect(component.currentValidationStatus).toEqual('validating');
  });
});
