import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiltersFeatureComponent } from './table-filters-feature.component';

xdescribe('TableFiltersFeatureComponent', () => {
  let component: TableFiltersFeatureComponent;
  let fixture: ComponentFixture<TableFiltersFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableFiltersFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFiltersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
