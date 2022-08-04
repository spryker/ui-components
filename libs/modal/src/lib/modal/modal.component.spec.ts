import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';

import { ModalComponent } from './modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'spy-test',
  template: `
    <spy-modal
      [visible]="visible"
      (visibleChange)="visibleChange($event)"
      [data]="data"
      [component]="component"
    >
      <ng-template> Content </ng-template>
    </spy-modal>
  `,
})
class TestComponent {
  visible: any;
  component: any;
  data: any;
  visibleChange = jest.fn();
}

class MockModalRef {
  afterClosed$ = new ReplaySubject<void>();

  close = jest.fn();
  afterClosed = jest.fn().mockReturnValue(this.afterClosed$.asObservable());
}
class MockModalService {
  modalRef = new MockModalRef();

  openTemplate = jest.fn().mockReturnValue(this.modalRef);
  openComponent = jest.fn().mockReturnValue(this.modalRef);
}

@Component({
  selector: 'spy-test-modal-component',
  template: ``,
})
class TestModalComponent {}

describe('ModalComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let service: MockModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ModalComponent],
      providers: [
        {
          provide: ModalService,
          useExisting: MockModalService,
        },
        MockModalService,
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MockModalService);
  });

  it('should render `spy-modal` component', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    expect(modalElem).toBeTruthy();
  });

  it('should call `openTemplate` method from modalService if `open` method has been triggered', () => {
    const mockData = { test: 'data' };
    component.data = mockData;
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();

    expect(service.openTemplate).toHaveBeenCalledWith(
      modalElem.componentInstance.templateRef,
      {
        data: mockData,
      },
    );
  });

  it('should call `openComponent` method from modalService if @Input(component) assigned and `open` method has been triggered', () => {
    const mockData = { test: 'data' };
    component.data = mockData;
    component.component = TestModalComponent;
    fixture.detectChanges();

    expect(service.openComponent).toHaveBeenCalledWith(TestModalComponent, {
      data: mockData,
    });
  });

  it('should reopen modal when @Input(component) has been changed', () => {
    const mockData = { test: 'data' };
    const reAssignedMockData = { new: 'data' };
    const mockComponent = { component: 'component' };
    component.data = mockData;
    component.component = mockComponent;
    fixture.detectChanges();

    expect(service.openComponent).toHaveBeenCalledWith(mockComponent, {
      data: mockData,
    });

    component.data = reAssignedMockData;
    component.component = TestModalComponent;
    fixture.detectChanges();

    expect(service.openComponent).toHaveBeenCalledWith(TestModalComponent, {
      data: reAssignedMockData,
    });
  });

  it('should change `visible` prop to `true` when `open` method has been triggered', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();

    expect(modalElem.componentInstance.visible).toBe(true);
  });

  it('should emit @Output(visibleChange) with `true` parameter when `open` method  has been triggered', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();

    expect(component.visibleChange).toHaveBeenCalledWith(true);
  });

  it('should change `visible` prop to `false` when `close` method  has been triggered if modal was opened', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();
    modalElem.componentInstance.close();

    expect(modalElem.componentInstance.visible).toBe(false);
  });

  it('should emit @Output(visibleChange) with `false` parameter when `close` method  has been triggered if drawer was opened', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();
    modalElem.componentInstance.close();

    expect(component.visibleChange).toHaveBeenCalledWith(false);
  });

  it('should call `close` method from `modalRef` and assign `modalRef` to `undefined` when `close` method  has been triggered if modal was opened', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();
    modalElem.componentInstance.close();

    expect(service.modalRef.close).toHaveBeenCalled();
    expect(modalElem.componentInstance.modalRef).toBeFalsy();
  });

  it('should emit @Output(visibleChange) with `false` parameter when and assign `modalRef` to `undefined` when `modalRef.afterClosed$` has been triggered', () => {
    fixture.detectChanges();
    const modalElem = fixture.debugElement.query(By.css('spy-modal'));

    modalElem.componentInstance.open();
    modalElem.componentInstance.modalRef.afterClosed$.next();

    expect(component.visibleChange).toHaveBeenCalledWith(false);
    expect(modalElem.componentInstance.modalRef).toBeFalsy();
  });
});
