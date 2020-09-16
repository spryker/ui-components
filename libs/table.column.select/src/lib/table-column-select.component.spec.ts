import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnSelectComponent } from './table-column-select.component';

describe('TableColumnSelectComponent', () => {
  let component: TableColumnSelectComponent;
  let fixture: ComponentFixture<TableColumnSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
