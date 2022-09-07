import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderModule } from '../header.module';

describe('HeaderComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    @Component({
        template: `
            <spy-header>
                <div class="test-content">Header Content</div>
            </spy-header>
        `,
    })
    class TestComponent {}

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HeaderModule],
            declarations: [TestComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render content', () => {
        const headerContentElement = fixture.debugElement.query(By.css('.test-content'));

        expect(headerContentElement).toBeTruthy();
    });
});
