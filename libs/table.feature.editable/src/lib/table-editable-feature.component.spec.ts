import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEditableFeatureComponent } from './table-editable-feature.component';

describe('TableEditableFeatureComponent', () => {
  let component: TableEditableFeatureComponent;
  let fixture: ComponentFixture<TableEditableFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
