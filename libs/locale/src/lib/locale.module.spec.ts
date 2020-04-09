import { async, TestBed } from '@angular/core/testing';
import { LocaleModule } from './locale.module';

describe('LocaleModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LocaleModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LocaleModule).toBeDefined();
  });
});
