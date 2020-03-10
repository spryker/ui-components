import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TableComponent } from './table.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template structure', () => {
    // it('must render `nz-table`', async () => {
    //   const host = await createComponent({ config: testConfig }, true);
    //
    //   host.detectChanges();
    //
    //   const tableElem = host.queryCss('nz-table');
    //
    //   expect(tableElem).toBeTruthy();
    // });
    //
    // it('must render `thead` with input `nzSingleSort` must be `true`', async () => {
    //   const host = await createComponent({ config: testConfig }, true);
    //
    //   host.detectChanges();
    //
    //   const tableHeadElem = host.queryCss('thead');
    //
    //   expect(tableHeadElem).toBeTruthy();
    //   expect(tableHeadElem!.attributes.nzSingleSort).toBe('true');
    // });
  })
});
