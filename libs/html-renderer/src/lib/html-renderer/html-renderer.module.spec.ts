import { async, TestBed } from '@angular/core/testing';
import { HtmlRendererModule } from './html-renderer.module';

describe('HtmlRendererModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HtmlRendererModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HtmlRendererModule).toBeDefined();
  });
});
