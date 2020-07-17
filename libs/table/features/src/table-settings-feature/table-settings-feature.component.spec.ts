import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSettingsFeatureComponent } from './table-settings-feature.component';

describe('TableSettingsFeatureComponent', () => {
  let component: TableSettingsFeatureComponent;
  let fixture: ComponentFixture<TableSettingsFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableSettingsFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSettingsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
