import { async, TestBed } from '@angular/core/testing';
import { FormItemModule } from '../form-item.module';
import { FormItemComponent } from './form-item.component.js';

describe('FormItemModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormItemModule],
      declarations: [FormItemComponent]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FormItemModule).toBeDefined();
  });
});
