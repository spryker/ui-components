import { TestBed, async } from '@angular/core/testing';
import { SelectComponentsDirective } from './select-components.directive';

xdescribe('Directive: SelectComponents', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponentsDirective],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create an instance', () => {});
});
