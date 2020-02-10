import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormItemComponent } from './form-item.component';
import { By } from '@angular/platform-browser';

describe('FormItemModule', () => {
  let component: FormItemComponent;
  let fixture: ComponentFixture<FormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzFormModule, BrowserAnimationsModule],
      declarations: [FormItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('template must render as a tree [nz-form-item]=>[nz-form-label,nz-form-control]', () => {
    const formItemChildren = fixture.debugElement.children;

    expect(formItemChildren.length).toEqual(1);
    expect(formItemChildren[0].name).toEqual('nz-form-item');

    const nzFormItemChildren = formItemChildren[0].children;

    expect(nzFormItemChildren.length).toEqual(2);
    expect(nzFormItemChildren[0].name).toEqual('nz-form-label');
    expect(nzFormItemChildren[1].name).toEqual('nz-form-control');
  });

  it('input nzNoColon must be set to true on nz-form-label', () => {
    const labelComponent = fixture.debugElement.query(By.css('nz-form-label'));

    expect(Boolean(labelComponent.attributes['ng-reflect-nz-no-colon'])).toEqual(true);
  });

  it('should show error validation message', () => {
    component.error = 'Error message!';
    component.triggerValidationStatus();
    fixture.detectChanges();
    expect(component.currentValidationStatus).toEqual('error');
  });

  it('should show warning validation message', () => {
    component.warning = 'Warning message!';
    component.triggerValidationStatus();
    fixture.detectChanges();
    expect(component.currentValidationStatus).toEqual('warning');
  });

  it('should show hint validation message', () => {
    component.hint = 'Hint message!';
    component.triggerValidationStatus();
    fixture.detectChanges();
    expect(component.currentValidationStatus).toEqual('validating');
  });
});
