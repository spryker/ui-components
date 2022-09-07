import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    @Component({
        template: `
            <spy-link [icon]="icon">
                <div class="default-content"></div>
            </spy-link>
        `,
    })
    class TestComponent {
        icon?: string;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, LinkComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should render `spy-icon` element if @Input(icon) is defined', () => {
        component.icon = 'icon';
        fixture.detectChanges();
        const iconElem = fixture.debugElement.query(By.css('spy-icon'));

        expect(iconElem).toBeTruthy();
    });

    it('should not render `spy-icon` element if @Input(icon) is not defined', () => {
        fixture.detectChanges();
        const iconElem = fixture.debugElement.query(By.css('spy-icon'));

        expect(iconElem).toBeFalsy();
    });

    it('should render default slot after `spy-icon` element', () => {
        component.icon = 'icon';
        fixture.detectChanges();

        const slotContentElem = fixture.debugElement.query(By.css('spy-icon + .default-content'));

        expect(slotContentElem).toBeTruthy();
    });

    it('should bind @Input(icon) to the `name` input of the `spy-icon` element', () => {
        const mockIcon = 'icon';

        component.icon = mockIcon;
        fixture.detectChanges();

        const iconElem = fixture.debugElement.query(By.css('spy-icon'));

        expect(iconElem.properties.name).toBe(mockIcon);
    });
});
