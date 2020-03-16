import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TableColumnDateComponent } from './table-column-date.component';
import { ContextPipe } from '@spryker/utils';

const configMock = { date: new Date('2020-01-01T17:25:00'), format: 'long' };

describe('TableColumnDateComponent', () => {
  @Component({
    selector: 'test-component',
    template: `
      <spy-table-column-date
        [config]="config"
        [context]="context"
      ></spy-table-column-date>
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
      declarations: [TableColumnDateComponent, TestComponent, ContextPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('Template must render value from config.date converted by DatePipe with format value', () => {
    const expectedValue = 'January 1, 2020 at 5:25:00 PM GMT+2';

    component.config = configMock;
    fixture.detectChanges();

    const innerHTML = fixture.debugElement.nativeElement.querySelector(
      'spy-table-column-date',
    ).innerHTML;
    expect(innerHTML).toContain(expectedValue);
  });
});
