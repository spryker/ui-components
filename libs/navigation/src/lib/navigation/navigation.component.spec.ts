import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

import { NavigationModule } from '../navigation.module';
import { NavigationComponent } from './navigation.component';

const mockedData = [
  {
    title: 'Dashboard Dashboard Dashboard Dashboard Dashboard',
  },
  {
    title: 'Orders Orders Orders Orders Orders Orders Orders',
    url: '',
    icon: 'orders',
    isActive: false,
    subItems: [
      {
        title: 'Dashboard2',
      },
      {
        title: 'Dashboard2',
        url: '',
        icon: '',
        isActive: false,
        subItems: [],
      },
    ],
  },
];

describe('NavigationComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    selector: 'test',
    template: `
        <spy-navigation (collapsedChange)="changeSpy()" [items]="items" [collapsed]="collapsed"></spy-navigation>
    `,
  })
  class TestComponent {
    items: any;
    collapsed: any;
    changeSpy = jest.fn();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavigationModule],
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  describe('Component structure', () => {
    it('should render <ul> with `nz-menu` attribute', () => {
      const ulElem = fixture.debugElement.query(By.css('ul'));

      expect(ulElem).toBeTruthy();
      expect(ulElem.attributes['nz-menu']).toBeDefined();
    });

    it('should not render <li> with empty array `items` input', () => {
      const liElem = fixture.debugElement.query(By.css('li'));

      expect(liElem).toBeFalsy();
    });
  });

  describe('@Input(items)', () => {
    it('should render <li> with empty array `items` input', () => {
      component.items = mockedData;

      fixture.detectChanges();

      const liElem = fixture.debugElement.query(By.css('li'));
      expect(liElem).toBeTruthy();
    });

    it('should render <li> with `nz-menu` attribute with empty `subItems` array', () => {
      component.items = [mockedData[0]];

      fixture.detectChanges();

      const liElem = fixture.debugElement.query(By.css('li'));

      expect(liElem.attributes['nz-menu-item']).toBeDefined();
    });

    it('should render <li> with `nz-submenu` attribute with non empty `subItems` array', () => {
      component.items = [mockedData[1]];

      fixture.detectChanges();

      const liElem = fixture.debugElement.query(By.css('li'));

      expect(liElem.attributes['nz-submenu']).toBeDefined();
    });

    it('should render submenu with non empty `subItems` array', () => {
      component.items = [mockedData[1]];

      fixture.detectChanges();

      const subElem = fixture.debugElement.query(By.css('li ul'));

      expect(subElem).toBeTruthy();
    });

    it('should render <li> inside submenu with `nz-menu` attribute with empty `subItems` array', () => {
      component.items = [mockedData[1]];

      fixture.detectChanges();

      const subLiElem = fixture.debugElement.query(By.css('li ul li'));

      expect(subLiElem.attributes['nz-menu-item']).toBeDefined();
    });

    it('should render <li> correct amount', () => {
      component.items = [mockedData[1]];

      fixture.detectChanges();

      const subLiElem = fixture.debugElement.query(By.css('li ul li'));

      expect(subLiElem.attributes['nz-menu-item']).toBeDefined();
    });

    it('should update binding when changed', () => {
      component.items = [mockedData[0]];

      fixture.detectChanges();

      const subLiElem = fixture.debugElement.queryAll(By.css('li'));

      expect(component.items.length).toBe(subLiElem.length);

      component.items = [mockedData[0], mockedData[0]];

      fixture.detectChanges();

      const updatedSubLiElem = fixture.debugElement.queryAll(By.css('li'));

      expect(component.items.length).toBe(updatedSubLiElem.length);
    });
  });

  describe('@Input(collapsed)', () => {
    it('should bind `nzInlineCollapsed` input of `nz-menu`', () => {
      component.collapsed = false;

      fixture.detectChanges();

      const ulElem = fixture.debugElement.query(By.css('ul[nz-menu]'));

      expect(ulElem.attributes['ng-reflect-nz-inline-collapsed']).toBe('false');
    });

    it('should update binding when changed', () => {
      component.collapsed = false;

      fixture.detectChanges();

      const ulElem = fixture.debugElement.query(By.css('ul[nz-menu]'));

      expect(ulElem.attributes['ng-reflect-nz-inline-collapsed']).toBe('false');

      component.collapsed = true;

      fixture.detectChanges();

      const updatedUlElem = fixture.debugElement.query(By.css('ul[nz-menu]'));

      expect(updatedUlElem.attributes['ng-reflect-nz-inline-collapsed']).toBe('true');
    });
  });

  describe('@Output(collapsedChange)', () => {
    it('should emit every time when the `collapsed` input is changed', () => {
      component.collapsed = false;

      fixture.detectChanges();

      expect(component.changeSpy).toHaveBeenCalled();

      component.collapsed = true;

      fixture.detectChanges();

      expect(component.changeSpy).toHaveBeenCalled();
    });
  });

  describe('Component methods', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
    });

    it('collapse() method should change the collapsed input to true', () => {
      component.collapsed = false;

      fixture.detectChanges();

      component.collapse();

      fixture.detectChanges();

      expect(component.collapsed).toBe(true);
    });

    it('expand() method should change the collapsed input to false', () => {
      component.collapsed = true;

      fixture.detectChanges();

      component.expand();

      fixture.detectChanges();

      expect(component.collapsed).toBe(false);
    });

    it('toggle() method should change the collapsed input to the opposite value', () => {
      component.collapsed = true;

      fixture.detectChanges();

      component.toggle();

      fixture.detectChanges();

      expect(component.collapsed).toBe(false);

      component.toggle();

      fixture.detectChanges();

      expect(component.collapsed).toBe(true);
    });
  });
});
