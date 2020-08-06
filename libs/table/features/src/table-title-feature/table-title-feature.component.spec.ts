import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTitleFeatureComponent } from './table-title-feature.component';

describe('TableTitleFeatureComponent', () => {
  let component: TableTitleFeatureComponent;
  let fixture: ComponentFixture<TableTitleFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTitleFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTitleFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
