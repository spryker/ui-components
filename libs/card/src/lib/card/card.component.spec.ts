import { Component, Input, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardModule } from '../card.module';

@Component({
    standalone: false,
    template: `
    <spy-card [spyTitle]="title" [extra]="extra" [actions]="[button]" [hoverable]="hoverable">
      Card Content
    </spy-card>

    <ng-template #button>
      <button>Button Content</button>
    </ng-template>
  `,
})
class TestComponent {
    @Input() title: string | TemplateRef<void> = '';
    @Input() extra: TemplateRef<void> | undefined;
    @Input() hoverable: boolean | undefined;
}

describe('CardComponent (hosted)', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [CardModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should be hoverable', () => {
        const cardDe = fixture.debugElement.query(By.css('nz-card'));
        expect(cardDe).toBeTruthy();
        expect((cardDe.nativeElement as HTMLElement).classList.contains('ant-card-hoverable')).toBe(false);

        fixture.componentInstance.hoverable = true;
        fixture.detectChanges();

        expect((cardDe.nativeElement as HTMLElement).classList.contains('ant-card-hoverable')).toBe(true);
    });

    it('should render card title with content', () => {
        const cardTitleContent = 'Card Title';
        fixture.componentInstance.title = cardTitleContent;
        fixture.detectChanges();

        const titleDe = fixture.debugElement.query(By.css('.ant-card-head-title'));
        expect(titleDe).toBeTruthy();
        expect((titleDe.nativeElement as HTMLElement).textContent!.trim()).toBe(cardTitleContent);
    });

    it('should render card extra', () => {
        fixture.componentInstance.extra = {} as unknown as TemplateRef<void>;
        fixture.detectChanges();

        const extraDe = fixture.debugElement.query(By.css('.ant-card-extra'));
        expect(extraDe).toBeTruthy();
    });

    it('should render actions wrapper with actions', () => {
        const actionsDe = fixture.debugElement.query(By.css('.ant-card-actions'));
        expect(actionsDe).toBeTruthy();
        expect((actionsDe.nativeElement as HTMLElement).children.length).toEqual(1);
    });
});
