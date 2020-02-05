import { async, TestBed } from '@angular/core/testing';
import { SpyCoreModule } from './core.module';

describe('SpyCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpyCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SpyCoreModule).toBeDefined();
  });
});
