import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableColumnImageComponent } from './table-column-image.component';
import { ContextPipe } from '@spryker/utils';

const configMock = { src: 'imageSrc' };

describe('TableColumnImageComponent', () => {
  @Component({
    selector: 'test-component',
    template: `
      <spy-table-column-image
        [config]="config"
        [context]="context"
      ></spy-table-column-image>
    `,
  })
  class TestComponent {
    config: any;
    context: any;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnImageComponent, TestComponent, ContextPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  describe('Image', () => {
    it('Template must render image node', () => {
      const image = fixture.debugElement.query(By.css('img'));
      expect(image).toBeTruthy();
    });

    it('Image should have src from config', () => {
      component.config = configMock;
      fixture.detectChanges();

      const imageSrc = fixture.debugElement.nativeElement.querySelector('img')
        .src;
      expect(imageSrc).toContain(configMock.src);
    });
  });
});
