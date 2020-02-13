import { async, TestBed } from '@angular/core/testing';
import { WebComponentsModule } from './web-components.module';

describe('WebComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebComponentsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebComponentsModule).toBeDefined();
  });
});
