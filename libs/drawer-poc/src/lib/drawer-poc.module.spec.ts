import { async, TestBed } from '@angular/core/testing';
import { DrawerPocModule } from './drawer-poc.module';

describe('DrawerPocModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DrawerPocModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DrawerPocModule).toBeDefined();
  });
});
