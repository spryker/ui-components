import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationService } from '../notification.service';
import { NotificationComponent } from './notification.component';

@Component({
  selector: 'spy-test-component',
  template: `
    <spy-notification
      [type]="type"
      [closeable]="closeable"
      [title]="title"
      [description]="description"
      [floating]="floating"
      (closed)="closed()"
      [floatingConfig]="floatingConfig"
    ></spy-notification>
  `,
})
class TestComponent {
  type: any;
  closeable: any;
  closed = jest.fn();
  title: any;
  description: any;
  floating: any;
  floatingConfig: any;

  @ViewChild(NotificationComponent)
  notification!: NotificationComponent;
}

describe('NotificationWrapperComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let notificationService: NotificationService;
  const mockedType = 'mockedType';
  const mockedClosable = true;
  const mockedConfig = { position: 'topLeft' };
  const mockedTitle = 'mockedTitle';
  const mockedDescription = 'mockedDescription';

  class MockNotificationService {
    show = jest.fn();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        MockNotificationService,
        {
          provide: NotificationService,
          useExisting: MockNotificationService,
        },
      ],
      declarations: [TestComponent, NotificationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    notificationService = TestBed.inject(NotificationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  describe('NonFloating', () => {
    it('should render <spy-notification-view>', async () => {
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      expect(notificationElem).toBeTruthy();
    });

    it('should bound `@Input(type)` to the input `type` of <spy-notification-view> component', async () => {
      component.type = mockedType;
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      expect(notificationElem.properties.type).toBe(mockedType);
    });

    it('should bound `@Input(closeable)` to the input `closeable` of <spy-notification-view> component', async () => {
      component.closeable = mockedClosable;
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      expect(notificationElem.properties.closeable).toBe(mockedClosable);
    });

    it('should render `@Input(title)` in the <spy-notification-view> component', async () => {
      component.title = mockedTitle;
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      expect(notificationElem.nativeElement.textContent).toContain(mockedTitle);
    });

    it('should render `@Input(description)` in the <spy-notification-view> component', async () => {
      component.description = mockedDescription;
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      expect(notificationElem.nativeElement.textContent).toContain(
        mockedDescription,
      );
    });

    it('should trigger `closed` callback when `closed` from <spy-notification-view> was triggered', async () => {
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      notificationElem.triggerEventHandler('closed', null);

      expect(component.closed).toHaveBeenCalled();
    });
  });

  describe('Floating', () => {
    it('should call `NotificationService.show` with appropriate data if `floating` is `true` and does not render <spy-notification-view>', async () => {
      const data = {
        ...mockedConfig,
        description: mockedDescription,
        type: mockedType,
        title: mockedTitle,
        closeable: mockedClosable,
      };

      component.floating = true;
      component.type = mockedType;
      component.closeable = mockedClosable;
      component.title = mockedTitle;
      component.description = mockedDescription;
      component.floatingConfig = mockedConfig;
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification-view'),
      );

      expect(notificationService.show).toHaveBeenCalledWith(data);
      expect(notificationElem).toBeFalsy();
    });
  });
});
