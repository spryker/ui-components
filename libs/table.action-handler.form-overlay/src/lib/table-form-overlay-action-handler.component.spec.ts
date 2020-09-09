import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { of } from 'rxjs';
import { PluckModule } from '@spryker/utils';
import { DrawerRef } from '@spryker/drawer';

const mockedData = { url: 'url', method: 'get' };

class MockDrawerRef {
  options = {
    data: of(mockedData),
  };
}

describe('TableFormOverlayActionHandlerComponent', () => {
  let fixture: ComponentFixture<TableFormOverlayActionHandlerComponent>;
  let component: TableFormOverlayActionHandlerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PluckModule],
      declarations: [TableFormOverlayActionHandlerComponent],
      providers: [{ provide: DrawerRef, useClass: MockDrawerRef }],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TableFormOverlayActionHandlerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('template should render spy-ajax-form', () => {
    const tableFormOverlayElement = fixture.debugElement.query(
      By.css('spy-ajax-form'),
    );

    expect(tableFormOverlayElement).toBeTruthy();
  });

  it('should bind url to action Input of spy-ajax-form', () => {
    const tableFormOverlayElement = fixture.debugElement.query(
      By.css('spy-ajax-form'),
    );

    expect(tableFormOverlayElement.properties.action).toBe(mockedData.url);
  });

  it('should bind method to method Input of spy-ajax-form', () => {
    const tableFormOverlayElement = fixture.debugElement.query(
      By.css('spy-ajax-form'),
    );

    expect(tableFormOverlayElement.properties.method).toBe(mockedData.method);
  });
});
