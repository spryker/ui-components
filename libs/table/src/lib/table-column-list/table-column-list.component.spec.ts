import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnListComponent } from './table-column-list.component';

xdescribe('TableColumnListComponent', () => {
  let component: TableColumnListComponent;
  let fixture: ComponentFixture<TableColumnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
