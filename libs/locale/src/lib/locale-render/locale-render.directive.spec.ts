import { TestBed, async } from '@angular/core/testing';
import { LocaleRenderDirective } from './locale-render.directive';

xdescribe('Directive: LocaleRender', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocaleRenderDirective],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('should create an instance', () => {});
});
