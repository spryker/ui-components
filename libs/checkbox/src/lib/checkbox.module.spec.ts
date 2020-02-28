import { async, TestBed } from '@angular/core/testing';
import { CheckboxModule } from './checkbox.module';

describe('CheckboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CheckboxModule).toBeDefined();
  });
});
