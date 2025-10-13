import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeadlineComponent, Level } from './headline.component';

@Component({
    standalone: false,
    template: `
        <spy-headline [level]="level">
            <div class="default-content"></div>
            <div actions class="actions-content"></div>
        </spy-headline>
    `,
})
class TestHostComponent {
    level: Level = Level.H1;
}

describe('HeadlineComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeadlineComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('renders default content in `.spy-headline__col--heading`', () => {
        const el = fixture.debugElement.query(By.css('.spy-headline__col--heading .default-content'));
        expect(el).toBeTruthy();
    });

    it('renders actions content in the last `.spy-headline__col`', () => {
        const el = fixture.debugElement.query(By.css('.spy-headline__col:last-child .actions-content'));
        expect(el).toBeTruthy();
    });

    it('applies level modifier class on `.spy-headline__title`', () => {
        fixture.componentInstance.level = Level.H3;
        fixture.detectChanges();

        const titleDe = fixture.debugElement.query(By.css('.spy-headline__title'));
        expect(titleDe).toBeTruthy();
        expect((titleDe.nativeElement as HTMLElement).classList.contains(`spy-headline__title--${Level.H3}`)).toBe(
            true,
        );
    });
});
