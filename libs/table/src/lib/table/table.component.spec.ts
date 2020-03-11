import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TableComponent } from './table.component';
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('TableComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let httpTestingController: HttpTestingController;

  @Component({
    selector: 'test-component',
    template: `<spy-table [config]="config"></spy-table>`
  })
  class TestComponent {
    config: any;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, TestComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    component.config = {
      dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
      colsUrl: 'https://angular-recipe-24caa.firebaseio.com/col.json',
      selectable: true,
    };

    const mockedCols = [
      {
        id: 'name',
        title: 'name',
        sortable: true,
        width: '40%'
      },
      {
        id: 'sku',
        title: 'sku',
        sortable: true
      },
      {
        id: 'id3',
        title: 'id3',
        sortable: true
      }
    ];

    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://angular-recipe-24caa.firebaseio.com/col.json');
    const req2 = httpTestingController.expectOne('https://angular-recipe-24caa.firebaseio.com/data.json?page=0');

    expect(req.request.method).toEqual('GET');
    req.flush(mockedCols);

    fixture.detectChanges();

    const labelElem = fixture.debugElement.queryAll(
      By.css('tr th'),
    );

    console.log(labelElem);
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
