import { ANALYZE_FOR_ENTRY_COMPONENTS, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DrawerContainerComponent } from '../drawer-container/drawer-container.component';
import { DrawerModule } from '../drawer.module';
import { DrawerComponentInputs } from './drawer.component';

@Component({
  selector: 'spy-test',
  template: `
    <spy-drawer
      [isOpen]="isOpen"
      [closeable]="closeable"
      [resizable]="resizable"
      [width]="width"
      [hasBackdrop]="hasBackdrop"
      (isOpenChange)="isOpenChange($event)"
      (closed)="closed()"
    >
      <ng-template let-drawerRef>
        Content
      </ng-template>
    </spy-drawer>
  `,
})
class TestComponent extends DrawerComponentInputs {
  isOpen = true;

  isOpenChange = jest.fn();
  closed = jest.fn();
}

describe('DrawerComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DrawerModule],
      declarations: [TestComponent],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [DrawerContainerComponent],
          multi: true,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render `spy-drawer` component', () => {
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    expect(drawerElem).toBeTruthy();
  });

  it('should bind @Input(isOpen) to `isOpen` of `spy-drawer`', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    expect(drawerElem.attributes['ng-reflect-is-open']).toBe('true');
  });

  it('should bind @Input(closeable) to `closeable` of `spy-drawer`', () => {
    component.closeable = true;
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    expect(drawerElem.attributes['ng-reflect-closeable']).toBe('true');
  });

  it('should bind @Input(resizable) to `resizable` of `spy-drawer`', () => {
    component.resizable = true;
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    expect(drawerElem.attributes['ng-reflect-resizable']).toBe('true');
  });

  it('should bind @Input(hasBackdrop) to `hasBackdrop` of `spy-drawer`', () => {
    component.hasBackdrop = true;
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    expect(drawerElem.attributes['ng-reflect-has-backdrop']).toBe('true');
  });

  it('should bind @Input(width) to `width` of `spy-drawer`', () => {
    component.width = '30%';
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    expect(drawerElem.attributes['ng-reflect-width']).toBe('30%');
  });

  it('@Output(isOpenChange) must be emitted every time when `open` state has been changed', () => {
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));
    drawerElem.componentInstance.open();

    expect(component.isOpenChange).toHaveBeenCalledWith(true);

    drawerElem.componentInstance.close();

    expect(component.isOpenChange).toHaveBeenCalledWith(false);
  });

  it('@Output(closed) must be emitted every time when `spy-drawer` has been closed', () => {
    fixture.detectChanges();
    const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

    drawerElem.componentInstance.open();
    drawerElem.componentInstance.close();

    expect(component.closed).toHaveBeenCalled();
  });
});
