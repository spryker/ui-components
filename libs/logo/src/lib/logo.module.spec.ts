import { async, TestBed } from '@angular/core/testing';
import { LogoModule } from './logo.module';

describe('LogoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogoModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LogoModule).toBeDefined();
  });
});
