import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LayoutComponent } from './layout.component';

@Component({
    standalone: false,
    template: `
        <spy-layout>
            <div class="test-content">Layout Content</div>
        </spy-layout>
    `,
})
class HostComponent {}

describe('LayoutComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutComponent, HostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render content', () => {
        const contentDe = fixture.debugElement.query(By.css('.test-content'));
        expect(contentDe).toBeTruthy();
    });
});
