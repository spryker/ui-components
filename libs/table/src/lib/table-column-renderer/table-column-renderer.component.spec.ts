import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnRendererComponent } from './table-column-renderer.component';

describe('TableColumnRendererComponent', () => {
  let component: TableColumnRendererComponent;
  let fixture: ComponentFixture<TableColumnRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableColumnRendererComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
