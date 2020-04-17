import { async, TestBed } from '@angular/core/testing';
import { ChipsModule } from './chips.module';

describe('ChipsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChipsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ChipsModule).toBeDefined();
  });
});
