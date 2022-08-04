import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DrawerWrapperModule } from './drawer-wrapper.module';

@Component({
  selector: 'spy-test',
  template: `
    <spy-drawer-wrapper
      [closeable]="closeable"
      [resizable]="resizable"
      [width]="width"
      (closed)="closed()"
    >
      Content
    </spy-drawer-wrapper>
  `,
})
class TestComponent {
  closeable = false;
  width = '50%';
  resizable = false;

  closed = jest.fn();
}

describe('DrawerWrapperComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DrawerWrapperModule],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render `spy-drawer-wrapper__actions` and `spy-drawer-wrapper__content` elements', () => {
    fixture.detectChanges();
    const contentElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__content'),
    );
    const actionsElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__actions'),
    );

    expect(contentElem).toBeTruthy();
    expect(actionsElem).toBeTruthy();
  });

  it('should render content inside `spy-drawer-wrapper__content` element as content projection', async () => {
    fixture.detectChanges();
    const contentElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__content'),
    );

    expect(contentElem.nativeElement.textContent).toContain('Content');
  });

  it('should show `spy-drawer-wrapper__action--close` button if @Input(closeable) is true', async () => {
    component.closeable = true;
    fixture.detectChanges();
    const buttonElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__action--close'),
    );

    expect(buttonElem).toBeTruthy();
  });

  it('should not show `spy-drawer-wrapper__action--close` button if @Input(closeable) is false', async () => {
    component.closeable = false;
    fixture.detectChanges();
    const buttonElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__action--close'),
    );

    expect(buttonElem).toBeFalsy();
  });

  it('should show `spy-drawer-wrapper__action--resize` button if @Input(resizable) is true', async () => {
    component.resizable = true;
    fixture.detectChanges();
    const buttonElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__action--resize'),
    );

    expect(buttonElem).toBeTruthy();
  });

  it('should not show `spy-drawer-wrapper__action--resize` button if @Input(resizable) is false', async () => {
    component.resizable = false;
    fixture.detectChanges();
    const buttonElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__action--resize'),
    );

    expect(buttonElem).toBeFalsy();
  });

  it('should bind @Input(width) to the `spy-drawer-wrapper` host element', async () => {
    const width = '20%';
    component.width = width;
    fixture.detectChanges();
    const hostElem = fixture.debugElement.query(By.css('.spy-drawer-wrapper'));

    expect(hostElem).toBeTruthy();
    expect(hostElem.styles.width).toBe(width);
  });

  it('should change `spy-drawer-wrapper` host element width when `spy-drawer-wrapper__action--resize` button has been triggered', async () => {
    const width = '20%';
    component.resizable = true;
    component.width = width;
    fixture.detectChanges();
    const buttonElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__action--resize'),
    );
    const hostElem = fixture.debugElement.query(By.css('.spy-drawer-wrapper'));

    expect(hostElem.styles.width).toBe(width);

    buttonElem.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(hostElem.nativeElement.classList).toContain(
      'spy-drawer-wrapper--maximized',
    );
    expect(hostElem.styles.width).toBe('100%');

    buttonElem.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(hostElem.styles.width).toBe(width);
  });

  it('should emit @Output(closed) when `spy-drawer-wrapper__action--close` button has been triggered', async () => {
    component.closeable = true;
    fixture.detectChanges();
    const buttonElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__action--close'),
    );

    buttonElem.triggerEventHandler('click', null);

    expect(component.closed).toHaveBeenCalled();
  });
});
