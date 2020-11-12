import { PortalModule } from '@angular/cdk/portal';
import {
  Component,
  NO_ERRORS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DrawerContainerComponent } from './drawer-container.component';

@Component({
  selector: 'spy-test',
  template: `
    <spy-drawer-container #drawerContainer></spy-drawer-container>
    <ng-template #drawerTpl let-drawerRef> Content </ng-template>
  `,
})
class TestComponent {
  closeable = false;
  width = '50%';
  resizable = false;

  @ViewChild('drawerContainer', { static: true })
  drawerContainer!: DrawerContainerComponent;

  @ViewChild('drawerTpl', { static: true })
  drawerTpl!: TemplateRef<any>;

  ngOnInit(): void {
    this.drawerContainer.openTemplate(this.drawerTpl, {
      closeable: this.closeable,
      width: this.width,
      hasBackdrop: false,
      resizable: this.resizable,
    });
  }
}

describe('DrawerContainerComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PortalModule],
      declarations: [TestComponent, DrawerContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render `spy-drawer-wrapper` element', () => {
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem).toBeTruthy();
  });

  it('should bind @Input(closeable) to `closeable` of `spy-drawer-wrapper`', () => {
    component.closeable = true;
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem.properties.closeable).toBe(true);
  });

  it('should bind @Input(resizable) to `resizable` of `spy-drawer-wrapper`', () => {
    component.resizable = true;
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem.properties.resizable).toBe(true);
  });

  it('should bind @Input(width) to `width` of `spy-drawer-wrapper`', () => {
    component.width = '30%';
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem.properties.width).toBe('30%');
  });

  it('should render content inside `spy-drawer-wrapper__content` element as content projection', async () => {
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem.nativeElement.textContent).toContain('Content');
  });
});
