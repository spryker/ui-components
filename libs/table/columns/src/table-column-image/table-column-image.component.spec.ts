import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnImageComponent } from './table-column-image.component';

describe('TableColumnImageComponent', () => {
  let component: TableColumnImageComponent;
  let fixture: ComponentFixture<TableColumnImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
