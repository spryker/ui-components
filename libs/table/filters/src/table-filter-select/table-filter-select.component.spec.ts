import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterSelectComponent } from './table-filter-select.component';

describe('TableFilterSelectComponent', () => {
  let component: TableFilterSelectComponent;
  let fixture: ComponentFixture<TableFilterSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFilterSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
