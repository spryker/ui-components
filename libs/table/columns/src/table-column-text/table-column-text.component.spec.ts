import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TableColumnTextComponent } from './table-column-text.component';
import { ContextPipe } from '@spryker/utils';

const configMock = {
  text: 'mockedText',
};

describe('TableColumnTextComponent', () => {
  @Component({
    selector: 'test-component',
    template: `
      <spy-table-column-text
        [config]="config"
        [context]="context"
      ></spy-table-column-text>
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
      declarations: [TableColumnTextComponent, TestComponent, ContextPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('Template must render value text from config', () => {
    component.config = configMock;
    fixture.detectChanges();

    const innerHTML = fixture.debugElement.nativeElement.querySelector(
      'spy-table-column-text',
    ).innerHTML;
    expect(innerHTML).toContain(configMock.text);
  });
});
