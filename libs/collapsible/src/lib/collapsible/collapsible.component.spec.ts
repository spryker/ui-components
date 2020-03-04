import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ICONS_TOKEN, IconService } from '@spryker/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CollapsibleComponent } from './collapsible.component';

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10">
    <defs>
        <path d="M5.122 9.146a1.264 1.264 0 01-.032-.033L1.389 5.274a1.36 1.36 0 010-1.887 1.264 1.264 0 011.82 0L6 6.282l2.792-2.895a1.264 1.264 0 011.786-.033l.033.033a1.36 1.36 0 010 1.887l-3.7 3.839a1.258 1.258 0 01-.952.386 1.259 1.259 0 01-.837-.353z" id="a"/>
    </defs>
    <g transform="matrix(0 1 1 0 -1 -1)" fill="none" fill-rule="evenodd">
        <mask id="b" fill="#fff"><use xlink:href="#a"/></mask>
        <use fill="currentColor" xlink:href="#a"/>
        <g mask="url(#b)" fill="currentColor">
            <path d="M.6.3h10.8v10.8H.6z"/>
        </g>
    </g>
</svg>`;

describe('CollapsibleComponent', () => {
  let component: CollapsibleComponent;
  let fixture: ComponentFixture<CollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzCollapseModule, BrowserAnimationsModule],
      declarations: [CollapsibleComponent],
      providers: [
        IconService,
        {
          provide: ICONS_TOKEN,
          useValue: {
            name: 'arrow',
            svg: arrowIcon,
          },
          multi: true,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleComponent);
    component = fixture.componentInstance;
    component.titleIcon = 'arrow';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template must render nz-collapse-panel from Ant Design inside nz-collapse component', () => {
    const collapseElem = fixture.debugElement.query(By.css('nz-collapse'));
    expect(collapseElem).toBeTruthy();

    const panelElem = collapseElem.query(By.css('nz-collapse-panel'));
    expect(panelElem).toBeTruthy();
  });

  it('should render icon component', () => {
    const collapsibleHeaderElem = fixture.debugElement.query(
      By.css('.ant-collapse-header'),
    );
    const headerIcon = collapsibleHeaderElem.query(By.css('spy-icon'));

    expect(headerIcon).toBeTruthy();
  });

  describe('Toggling functionality', () => {
    it('Should change active on opposite by toggle method', () => {
      component.toggle();
      fixture.detectChanges();

      expect(component.active).toBeTruthy();

      component.toggle();
      fixture.detectChanges();

      expect(component.active).toBeFalsy();
    });

    it('Should emit event on collapsible header click', () => {
      const collapsibleHeaderElem = fixture.debugElement.query(
        By.css('.ant-collapse-header'),
      );
      const callback = jest.fn();

      component.activeChange.subscribe(callback);
      collapsibleHeaderElem.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(callback).toHaveBeenCalledWith(true);

      collapsibleHeaderElem.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(callback).toHaveBeenCalledWith(false);
    });
  });
});
