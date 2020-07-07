import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableHtmlOverlayActionHandlerModule } from './table-html-overlay-action-handler.module';
import { of } from 'rxjs';
import { DrawerRef, DrawerModule } from '@spryker/drawer';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { NotificationModule } from '@spryker/notification';
import { AjaxActionService } from '@spryker/ajax-action';

const mockUrl = 'mockUrl';
const mockedData = { url: mockUrl, method: 'get' };
const mockHtmlTemplate = `
  <input type="text" name="name" id="name">
  <button type="submit">Submit</button>
`;

@Component({
  selector: 'spy-test',
  template: `
    <spy-table-html-overlay-action-handler></spy-table-html-overlay-action-handler>
  `,
})
class TestComponent {
  action: any;
  method: any;
}

class MockDrawerRef {
  options = {
    data: of(mockedData),
  };
}

class MockAjaxActionService {
  handle = jest.fn();
}

describe('TableHtmlOverlayActionHandlerComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StaticHtmlRendererModule,
        HttpClientTestingModule,
        TableHtmlOverlayActionHandlerModule,
        DrawerModule,
        NotificationModule.forRoot(),
      ],
      declarations: [TestComponent],
      providers: [
        { provide: AjaxActionService, useExisting: MockAjaxActionService },
        { provide: DrawerRef, useClass: MockDrawerRef },
        MockDrawerRef,
        MockAjaxActionService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('component should send GET request to get HTML on the initialization stage', () => {
    component.action = mockUrl;
    fixture.detectChanges();
    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');
  });
});
