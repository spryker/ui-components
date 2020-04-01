import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from '../alert.module';

describe('AlertComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    // tslint:disable-next-line: component-selector
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
      imports: [NoopAnimationsModule, AlertModule],
      declarations: [TestComponent],
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

  it('should render projected content inside <nz-alert>', async () => {
    fixture.detectChanges();

    const alertElem = fixture.debugElement.query(By.css('nz-alert'));

    expect(alertElem.nativeElement.textContent).toMatch('Content');
  });

  describe('@Input(type)', () => {
    it('should bind to `nzType` of <nz-alert>', () => {
      component.type = 'info';
      fixture.detectChanges();

      const alertElem = fixture.debugElement.query(By.css('nz-alert'));

      expect(alertElem.attributes['ng-reflect-nz-type']).toBe('info');
    });

    it('should show icon when `type` is `error`', () => {
      component.type = 'error';
      fixture.detectChanges();

      const iconElem = fixture.debugElement.query(
        By.css('nz-alert spy-icon.spy-icon-error'),
      );

      expect(iconElem).toBeTruthy();
    });
  });
});
