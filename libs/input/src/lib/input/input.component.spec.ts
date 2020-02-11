import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { InputComponent } from './input.component';

const mockedData = {
  name: 'new Name',
  value: 'new Value',
  type: 'email',
  placeholder: 'new Placeholder',
  readonly: true,
  disabled: true,
  prefix: 'prefix',
  suffix: 'suffix',
};

interface InputComponentWithSignature extends InputComponent {
  [key: string]: any;
}

describe('InputComponent', () => {
  let component: InputComponentWithSignature;
  let fixture: ComponentFixture<InputComponentWithSignature>;

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

    Object.entries(mockedData).forEach(([key, value]) => {
      component[key] = value;
    });

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
    const inputElem = fixture.debugElement.query(By.css('input'));

    expect(inputElem.properties.name).toEqual(mockedData.name);
    expect(inputElem.properties.value).toEqual(mockedData.value);
    expect(inputElem.properties.type).toEqual(mockedData.type);
    expect(inputElem.properties.placeholder).toEqual(mockedData.placeholder);
    expect(inputElem.properties.disabled).toEqual(mockedData.disabled);
    expect(inputElem.properties.readOnly).toEqual(mockedData.readonly);
  });

  it('input prefix and suffix must be bound to nz-input-group', () => {
    const inputGroupElem = fixture.debugElement.query(By.css('nz-input-group'));

    expect(inputGroupElem.properties.nzPrefix).toEqual(mockedData.prefix);
    expect(inputGroupElem.properties.nzSuffix).toEqual(mockedData.suffix);
  });

});
