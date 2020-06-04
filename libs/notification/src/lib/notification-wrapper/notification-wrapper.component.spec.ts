import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationWrapperComponent } from './notification-wrapper.component';
import { ToastPackage, ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

describe('NotificationWrapperComponent', () => {
  let component: NotificationWrapperComponent;
  let fixture: ComponentFixture<NotificationWrapperComponent>;

  const mockedType = 'mockedType';
  const mockedConfig = { closeButton: true };
  const mockedTitle = 'mockedTitle';
  const mockedMessage = 'mockedMessage';

  class MockToastPackage {
    toastType = mockedType;
    config = mockedConfig;
    title = mockedTitle;
    message = mockedMessage;
  }

  class MockToastrService {
    remove = jest.fn();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ToastPackage, useClass: MockToastPackage },
        { provide: ToastrService, useClass: MockToastrService },
      ],
      declarations: [NotificationWrapperComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render <spy-notification>', async () => {
    fixture.detectChanges();

    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification'),
    );

    expect(notificationElem).toBeTruthy();
  });

  it('should bind toastPackage.toastType to type of <spy-notification>', async () => {
    fixture.detectChanges();

    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification'),
    );

    expect(notificationElem.properties.type).toBe(mockedType);
  });

  it('should bind toastPackage.closeButton to closeable of <spy-notification>', async () => {
    fixture.detectChanges();

    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification'),
    );

    expect(notificationElem.properties.closeable).toBe(
      mockedConfig.closeButton,
    );
  });

  it('closed output of <spy-notification> should call toastrService.remove', async () => {
    fixture.detectChanges();

    const notificationElem = fixture.debugElement.query(
      By.css('spy-notification'),
    );

    notificationElem.triggerEventHandler('closed', {});

    expect(component.toastrService.remove).toHaveBeenCalled();
  });
});
