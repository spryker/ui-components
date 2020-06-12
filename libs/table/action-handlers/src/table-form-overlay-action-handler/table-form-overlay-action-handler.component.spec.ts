import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';

describe('TableFormOverlayActionHandlerComponent', () => {
  let component: TableFormOverlayActionHandlerComponent;
  let fixture: ComponentFixture<TableFormOverlayActionHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableFormOverlayActionHandlerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormOverlayActionHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
