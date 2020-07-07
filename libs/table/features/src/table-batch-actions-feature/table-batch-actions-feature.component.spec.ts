import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBatchActionsFeatureComponent } from './table-batch-actions-feature.component';

describe('TableBatchActionsFeatureComponent', () => {
  let component: TableBatchActionsFeatureComponent;
  let fixture: ComponentFixture<TableBatchActionsFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBatchActionsFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBatchActionsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
