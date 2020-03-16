import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnDateComponent } from './table-column-date.component';

describe('TableColumnDateComponent', () => {
  let component: TableColumnDateComponent;
  let fixture: ComponentFixture<TableColumnDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnDateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
