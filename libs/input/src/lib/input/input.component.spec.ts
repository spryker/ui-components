import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, SimpleChange } from "@angular/core";

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('template must render input with [nz-input] from Ant Design inside nz-input-group component', () => {
    const inputGroupElem = fixture.debugElement.query(By.css('nz-input-group'));
    expect(inputGroupElem).toBeTruthy();

    const inputElem = inputGroupElem.query(By.css('input'));
    expect(inputElem).toBeTruthy();
    expect(inputElem.nativeElement.hasAttribute('nz-input')).toBeTruthy();
  });

  it('check input data reflection to the internal view', () => {

    const mockedData = {
      name: 'new Name',
      value: 'new Value',
      type: 'email',
      placeholder: 'new Placeholder',
      readonly: true,
      disabled: true
    };

    component.name = mockedData.name;
    component.value = mockedData.value;
    component.type = mockedData.type;
    component.placeholder = mockedData.placeholder;
    component.readonly = mockedData.readonly;
    component.disabled = mockedData.disabled;

    component.ngOnChanges({
      name: new SimpleChange(mockedData.name, mockedData.name, true)
    });
    fixture.detectChanges();
    fixture.detectChanges();
    const inputElem = fixture.debugElement.query(By.css('input'));
    console.log(inputElem.properties);

    expect(inputElem.properties.name).toEqual(mockedData.name);
  });

});
