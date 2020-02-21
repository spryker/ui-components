import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationModule } from '../navigation.module';

import { NavigationComponent } from './navigation.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavigationModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  describe('Component structure', () => {
    it('should render <ul> with `nz-menu` attribute', () => {
      const ulElem = fixture.debugElement.query(By.css('ul'));

      expect(ulElem).toBeTruthy();
      expect(ulElem.attributes['nz-menu']).toBeDefined();
    });

    // it('should render <li> with `nz-menu` attribute', () => {
    //   const liElem = fixture.debugElement.query(By.css('li'));
    //
    //   expect(liElem.attributes['nz-menu-item']).toBeDefined();
    // });
  });
});
