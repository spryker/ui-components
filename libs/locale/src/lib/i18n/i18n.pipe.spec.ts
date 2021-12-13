/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';

import { I18nPipe } from './i18n.pipe';

xdescribe('Pipe: I18ne', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nPipe],
      teardown: { destroyAfterEach: false },
    });
  });

  it('create an instance', () => {
    const pipe = TestBed.inject(I18nPipe);
    expect(pipe).toBeTruthy();
  });
});
