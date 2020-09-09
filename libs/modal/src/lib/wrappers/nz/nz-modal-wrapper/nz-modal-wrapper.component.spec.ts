import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzModalWrapperComponent } from './nz-modal-wrapper.component';

describe('NzModalWrapperComponent', () => {
  let component: NzModalWrapperComponent;
  let fixture: ComponentFixture<NzModalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NzModalWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
