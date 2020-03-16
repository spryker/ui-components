import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnTextComponent } from './table-column-text.component';

describe('TableColumnTextComponent', () => {
  let component: TableColumnTextComponent;
  let fixture: ComponentFixture<TableColumnTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnTextComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
