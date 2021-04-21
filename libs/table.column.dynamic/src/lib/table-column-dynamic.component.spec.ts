import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnDynamicComponent } from './table-column-dynamic.component';

describe('TableColumnDynamicComponent', () => {
  let component: TableColumnDynamicComponent;
  let fixture: ComponentFixture<TableColumnDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
