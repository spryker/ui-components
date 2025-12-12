import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogoComponent } from './logo.component';

@Component({
    standalone: false,
    template: `<spy-logo [size]="size"></spy-logo>`,
})
class HostComponent {
    @Input() size?: string;
}

describe('LogoComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogoComponent, HostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        const logoDe = fixture.debugElement.query(By.directive(LogoComponent));
        expect(logoDe).toBeTruthy();
    });

    it('should change image modifier', () => {
        const logoImageModifier = 'full';
        fixture.componentInstance.size = logoImageModifier;
        fixture.detectChanges();

        const logoElement = fixture.debugElement.query(By.css(`.spy-logo--${logoImageModifier}`));
        expect(logoElement).toBeTruthy();
    });
});
