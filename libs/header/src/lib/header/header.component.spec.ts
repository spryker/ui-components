import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

@Component({
    standalone: false,
    template: `
        <spy-header>
            <div class="test-content">Header Content</div>
        </spy-header>
    `,
})
class TestHostComponent {}

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        const headerDe = fixture.debugElement.query(By.directive(HeaderComponent));
        expect(headerDe).toBeTruthy();
    });

    it('should render content', () => {
        const contentEl = fixture.debugElement.query(By.css('.test-content'));
        expect(contentEl).toBeTruthy();
    });
});
