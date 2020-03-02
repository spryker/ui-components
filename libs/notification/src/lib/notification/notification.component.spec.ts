import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { By } from '@angular/platform-browser';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import { NotificationComponent } from './notification.component';
import {
  errorIcon,
  successIcon,
  warningIcon,
  infoIcon,
  removeIcon,
} from './icons';

const icons = [
  {
    name: 'error',
    svg: errorIcon,
  },
  {
    name: 'success',
    svg: successIcon,
  },
  {
    name: 'warning',
    svg: warningIcon,
  },
  {
    name: 'info',
    svg: infoIcon,
  },
  {
    name: 'remove',
    svg: removeIcon,
  },
];

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzAlertModule, IconModule, NoopAnimationsModule],
      declarations: [NotificationComponent],
      providers: [
        {
          provide: ICONS_TOKEN,
          useValue: icons,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    component.closeable = true;
    component.type = 'error';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nz-alert', () => {
    const alert = fixture.debugElement.query(By.css('nz-alert'));

    expect(alert).toBeTruthy();
  });

  it('should emit event on alert close', fakeAsync(() => {
    const closeBtn = fixture.debugElement.query(
      By.css('.ant-alert-close-icon'),
    );
    const callback = jest.fn();

    component.closed.subscribe(callback);
    closeBtn.triggerEventHandler('click', null);

    expect(closeBtn).toBeTruthy();

    fixture.detectChanges();

    tick();
    expect(callback).toHaveBeenCalled();
  }));

  it('close method should return current closeable', () => {
    let currentCloseable = component.close();

    expect(currentCloseable).toBeTruthy();

    component.closeable = false;

    fixture.detectChanges();
    currentCloseable = component.close();

    expect(currentCloseable).toBeFalsy();
  });
});
