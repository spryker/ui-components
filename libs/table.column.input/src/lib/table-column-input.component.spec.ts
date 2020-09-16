import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnInputComponent } from './table-column-input.component';

describe('TableColumnInputComponent', () => {
  let component: TableColumnInputComponent;
  let fixture: ComponentFixture<TableColumnInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
