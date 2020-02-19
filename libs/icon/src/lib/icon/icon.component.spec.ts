import { NO_ERRORS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ICONS_TOKEN, IconService } from './icon.component.service';

import { IconComponent } from './icon.component';

const promiseIcon = 'home';
const stringIcon = 'string';

const svgIcon = `<svg viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" class=""></path></svg>`;

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        IconService,
        {
          provide: ICONS_TOKEN,
          useValue: [
            {
              name: promiseIcon,
              svg: () => {
                return new Promise(resolve => {
                  resolve(svgIcon);
                });
              },
            },
            {
              name: stringIcon,
              svg: svgIcon,
            },
          ],
        },
      ],
      declarations: [IconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(IconComponent, {
        set: {
          encapsulation: ViewEncapsulation.Emulated,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.name = promiseIcon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an icon from promise', () => {
    fixture.detectChanges();
    const iconComponent = fixture.debugElement.query(By.css(`i`));

    expect(iconComponent.properties.nzType).toEqual(promiseIcon);
  });

  it('should render an icon from string', () => {
    component.name = stringIcon;
    component.ngOnChanges();
    fixture.detectChanges();

    setTimeout(() => {
      const iconComponent = fixture.debugElement.query(By.css(`i`));

      expect(iconComponent.properties.nzType).toEqual(stringIcon);
    }, 0);
  });
});
