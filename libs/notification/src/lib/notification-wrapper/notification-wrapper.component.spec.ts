import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { ToastPackage, ToastRef, ToastrService } from 'ngx-toastr';

import { NotificationWrapperComponent } from './notification-wrapper.component';

describe('NotificationWrapperComponent', () => {
  let component: NotificationWrapperComponent;
  let fixture: ComponentFixture<NotificationWrapperComponent>;

  const mockedType = 'mockedType';
  const mockedConfig = { closeButton: true };
  const mockedTitle = 'mockedTitle';
  const mockedMessage = 'mockedMessage';
  const mockedToastId = 'mockedToastId';

  const MockToastPackage = {
    toastId: mockedToastId,
    toastType: mockedType,
    afterActivate: jest.fn(),
    config: mockedConfig,
    message: mockedMessage,
    title: mockedTitle,
    toastRef: new ToastRef(null as any),
  };

  class MockToastrService {
    remove = jest.fn();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, OfTypePipeModule],
      providers: [
        { provide: ToastPackage, useValue: MockToastPackage },
        { provide: ToastrService, useExisting: MockToastrService },
        MockToastrService,
      ],
      declarations: [NotificationWrapperComponent],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationWrapperComponent);
    component = fixture.componentInstance;
    component.title = 'title';
    component.message = 'message';
    fixture.detectChanges();
  });

  it('should render <spy-notification-view>', async () => {
    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification-view'),
    );

    expect(notificationElem).toBeTruthy();
  });

  it('should bind toastPackage.toastType to type of <spy-notification-view>', async () => {
    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification-view'),
    );

    expect(notificationElem.properties.type).toBe(mockedType);
  });

  it('should bind toastPackage.closeButton to closeable of <spy-notification-view>', async () => {
    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification-view'),
    );

    expect(notificationElem.properties.closeable).toBe(
      mockedConfig.closeButton,
    );
  });

  it('closed output of <spy-notification-view> should call notificationRef.close', async () => {
    component.notificationRef = {
      close: jest.fn(),
    } as any;
    fixture.detectChanges();
    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification-view'),
    );

    notificationElem.triggerEventHandler('closed', null);

    // tslint:disable-next-line: no-non-null-assertion
    expect(component.notificationRef!.close).toHaveBeenCalled();
  });
});
