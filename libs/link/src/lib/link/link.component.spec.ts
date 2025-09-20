import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkComponent } from './link.component';

@Component({
    standalone: false,
    template: `
        <spy-link [icon]="icon">
            <div class="default-content"></div>
        </spy-link>
    `,
})
class HostComponent {
    @Input() icon?: string;
}

describe('LinkComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LinkComponent, HostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should render <spy-icon> element if @Input(icon) is defined', () => {
        fixture.componentInstance.icon = 'icon';
        fixture.detectChanges();

        const iconElem = fixture.debugElement.query(By.css('spy-icon'));
        expect(iconElem).toBeTruthy();
    });

    it('should not render <spy-icon> element if @Input(icon) is not defined', () => {
        fixture.componentInstance.icon = undefined;
        fixture.detectChanges();

        const iconElem = fixture.debugElement.query(By.css('spy-icon'));
        expect(iconElem).toBeFalsy();
    });

    it('should render default slot after <spy-icon> element', () => {
        fixture.componentInstance.icon = 'icon';
        fixture.detectChanges();

        const slotContentElem = fixture.debugElement.query(By.css('spy-icon + .default-content'));
        expect(slotContentElem).toBeTruthy();
    });

    it('should bind @Input(icon) to the `name` input of the <spy-icon> element', () => {
        const mockIcon = 'icon';
        fixture.componentInstance.icon = mockIcon;
        fixture.detectChanges();

        const iconElem = fixture.debugElement.query(By.css('spy-icon'));
        expect(iconElem.properties.name).toBe(mockIcon);
    });
});
