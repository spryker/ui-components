import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { DropdownComponent } from './dropdown.component';
import { DropdownModule } from '../dropdown.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockedData = [
  {
    title: 'Dropdown',
  },
  {
    action: '',
    title: 'Dropdown',
    icon: 'orders',
    disabled: false,
    subItems: [
      {
        title: 'Subitem',
      },
      {
        action: '',
        title: 'SubItem2',
        icon: '',
        disabled: false,
        subItems: [],
      },
    ],
  },
];

describe('DropdownComponent', () => {
  @Component({
    selector: 'test',
    template: `
      <spy-dropdown
        [items]="items"
        [placement]="placement"
        [visible]="visible"
        [disabled]="disabled"
      ></spy-dropdown>
    `,
  })
  class TestComponent {
    items: any;
    placement: any;
    visible: any;
    disabled: any;
    visibleChange = jest.fn();
    actionTriggered = jest.fn();
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule, BrowserAnimationsModule],
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));
  afterEach(() => {
    fixture.destroy();
  });

  it('template must render span and nz-dropdown-menu from Ant Design', () => {
    const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
    const nzDropdownElem = fixture.debugElement.query(
      By.css('nz-dropdown-menu'),
    );

    expect(spanElem).toBeTruthy();
    expect(nzDropdownElem).toBeTruthy();
  });

  describe('Inputs must be bound to span', () => {
    it('should bind placement to nzPlacement of nz-dropdown', () => {
      const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
      const mockedValue = 'bottomLeft';

      component.placement = mockedValue;

      fixture.detectChanges();

      expect(spanElem.attributes['ng-reflect-nz-placement']).toBe(mockedValue);
    });

    // it('should bind disabled to nzDisabled of nz-dropdown', () => {
    //   const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
    //   component.disabled = true;

    //   fixture.detectChanges();

    //   expect(spanElem.attributes['ng-reflect-nz-disabled']).toBe('true');
    // });
  });

  describe('@Input(items)', () => {
    // it('should render <li> with empty array `items` input', () => {
    //   component.items = mockedData;
    //   fixture.detectChanges();
    //   const liElem = fixture.debugElement.query(By.css('li'));
    //   expect(liElem).toBeTruthy();
    // });
    // it('should render <li> with `nz-menu-item` attribute with empty `subItems` array', () => {
    //   component.items = [mockedData[0]];
    //   fixture.detectChanges();
    //   const liElem = fixture.debugElement.query(By.css('li'));
    //   expect(liElem.attributes['nz-menu-item']).toBeDefined();
    // });
    // it('should render <li> with `nz-submenu` attribute with non empty `subItems` array', () => {
    //   component.items = [mockedData[1]];
    //   fixture.detectChanges();
    //   const liElem = fixture.debugElement.query(By.css('li'));
    //   expect(liElem.attributes['nz-submenu']).toBeDefined();
    // });
  });
});
