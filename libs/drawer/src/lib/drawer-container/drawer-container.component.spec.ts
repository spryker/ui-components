import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DrawerContainerComponent } from './drawer-container.component';
import { DrawerContainerModule } from './drawer-container.module';

@Component({
  selector: 'spy-test',
  template: `
    <spy-drawer-container #drawerContainer></spy-drawer-container>
    <ng-template #drawerTpl let-drawerRef>
      Content
    </ng-template>
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
      imports: [DrawerContainerModule],
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

    expect(wrapperElem.attributes['ng-reflect-closeable']).toBe('true');
  });

  it('should bind @Input(resizable) to `resizable` of `spy-drawer-wrapper`', () => {
    component.resizable = true;
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem.attributes['ng-reflect-resizable']).toBe('true');
  });

  it('should bind @Input(width) to `width` of `spy-drawer-wrapper`', () => {
    component.width = '30%';
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('spy-drawer-wrapper'),
    );

    expect(wrapperElem.attributes['ng-reflect-width']).toBe('30%');
  });

  it('should render content inside `spy-drawer-wrapper__content` element as content projection', async () => {
    fixture.detectChanges();
    const wrapperElem = fixture.debugElement.query(
      By.css('.spy-drawer-wrapper__content'),
    );

    expect(wrapperElem.nativeElement.textContent).toContain('Content');
  });
});
