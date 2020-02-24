import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertModule } from '../alert.module';
import { AlertComponent } from './alert.component';
import { CommonModule } from "@angular/common";
import { IconModule } from "@spryker/icon";

describe('AlertComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    selector: 'text',
    template: `
      <spy-alert [type]="type">Content</spy-alert>
    `,
  })
  class TestComponent {
    type: any;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, IconModule],
      declarations: [TestComponent, AlertComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render <nz-alert>', () => {
    const alertElem = fixture.debugElement.query(By.css('nz-alert'));

    expect(alertElem).toBeTruthy();
  });

  it('should render projected content inside <spry-alert> and bind it to `nzMessage`', () => {
    fixture.detectChanges();

    const alertElem = fixture.debugElement.query(By.css('nz-alert'));
    console.log(alertElem.properties);

    // expect(alertElem.properties.nzMessage).toBe('Content');
  });

  describe('@Input(type)', () => {
    it('should show icon when `type` is `error`', () => {
      component.type = 'error';
      fixture.detectChanges();

      const iconElem = fixture.debugElement.query(
          By.css('nz-alert spy-icon[name="error"]'),
      );

      expect(iconElem).toBeTruthy();
    });

    it('should bind to `nzType` of <nz-alert>', () => {
      component.type = 'info';
      fixture.detectChanges();

      const alertElem = fixture.debugElement.query(By.css('nz-alert'));

      expect(alertElem.properties.nzType).toBe('info');
    });
  });
});
