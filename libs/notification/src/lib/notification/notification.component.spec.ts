import { Component, ViewChild } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

import { NotificationModule } from '../notification.module';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'test',
    template: `
      <spy-notification
        [type]="type"
        [closeable]="closeable"
        (closed)="changeSpy()"
      >
        <span title>
          <span class="test-title">Title...</span>
        </span>
        <span description>
          <span class="test-description">Description...</span>
        </span>
      </spy-notification>
    `,
  })
  class TestComponent {
    closeable = false;
    type = 'info';
    changeSpy = jest.fn();
    @ViewChild(NotificationComponent) notification!: NotificationComponent;
  }

  let component: TestComponent;
  let notificationComponent: NotificationComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotificationModule, NoopAnimationsModule],
      declarations: [TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    notificationComponent = component.notification;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nz-alert', () => {
    const alert = fixture.debugElement.query(By.css('nz-alert'));

    expect(alert).toBeTruthy();
  });

  it('should render title with icon in nzMessage', () => {
    const alertMessage = fixture.debugElement.query(
      By.css('.ant-alert-message'),
    );

    expect(alertMessage).toBeTruthy();

    const messageIcon = alertMessage.query(By.css('spy-icon'));
    const messageTitle = alertMessage.query(By.css('.test-title'));

    expect(messageIcon).toBeTruthy();
    expect(messageTitle).toBeTruthy();
  });

  it('should render description in nzDescription', () => {
    const alertDescription = fixture.debugElement.query(
      By.css('.ant-alert-description'),
    );

    expect(alertDescription).toBeTruthy();

    const descriptionContent = alertDescription.query(
      By.css('.test-description'),
    );

    expect(descriptionContent).toBeTruthy();
  });

  it('should render close icon in nzCloseText', () => {
    component.closeable = true;
    fixture.detectChanges();

    const closeLink = fixture.debugElement.query(
      By.css('.ant-alert-close-icon'),
    );

    expect(closeLink).toBeTruthy();

    const closeIcon = closeLink.query(By.css('spy-icon'));

    expect(closeIcon).toBeTruthy();
  });

  describe('Inputs must be bound to internal nz-alert', () => {
    it('should bound type to nzType', () => {
      const type = 'success';

      component.type = type;
      fixture.detectChanges();

      const nzAlert = fixture.debugElement.query(By.css('nz-alert'));

      expect(nzAlert.attributes['ng-reflect-nz-type']).toEqual(type);
    });

    it('should bound closeable to nzCloseable', () => {
      component.closeable = true;
      fixture.detectChanges();

      const nzAlert = fixture.debugElement.query(By.css('nz-alert'));

      expect(nzAlert.attributes['ng-reflect-nz-closeable']).toEqual('true');
    });
  });

  describe('Closeable functionality', () => {
    it('should emit closed on alert close', fakeAsync(() => {
      component.closeable = true;
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(
        By.css('.ant-alert-close-icon'),
      );
      expect(closeBtn).toBeTruthy();

      closeBtn.triggerEventHandler('click', null);

      fixture.detectChanges();

      tick();
      expect(component.changeSpy).toHaveBeenCalled();
    }));

    it('close method should return current closeable value and call `NzAlertComponent.closeAlert()`', fakeAsync(() => {
      const nzAlertElem = fixture.debugElement.query(
        By.directive(NzAlertComponent),
      );

      expect(nzAlertElem).toBeTruthy();

      const nzAlert = nzAlertElem.componentInstance as NzAlertComponent;

      const closeSpy = spyOn(nzAlert, 'closeAlert');

      let currentCloseable = notificationComponent.close();

      expect(currentCloseable).toBeFalsy();

      component.closeable = true;

      fixture.detectChanges();
      tick();

      expect(closeSpy).toHaveBeenCalledTimes(1);

      currentCloseable = notificationComponent.close();

      expect(currentCloseable).toBeTruthy();

      fixture.detectChanges();
      tick();

      expect(closeSpy).toHaveBeenCalledTimes(2);
    }));
  });
});
