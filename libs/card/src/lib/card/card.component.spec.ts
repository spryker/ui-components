import { Component, TemplateRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardModule } from '../card.module';

describe('CardComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    @Component({
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
        title: string | TemplateRef<void> = '';
        extra: TemplateRef<void> | undefined;
        hoverable: boolean | undefined;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CardModule],
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

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('sould be hoverable', () => {
        const card = fixture.debugElement.query(By.css('nz-card'));
        expect(card).toBeTruthy();
        expect(card.classes['ant-card-hoverable']).toBeFalsy();

        component.hoverable = true;
        fixture.detectChanges();
        expect(card.classes['ant-card-hoverable']).toBeTruthy();
    });

    it('should render card title with content', () => {
        const cardTitleContent = 'Card Title';
        component.title = cardTitleContent;
        fixture.detectChanges();

        const cardTitleElement = fixture.debugElement.query(By.css('.ant-card-head-title'));
        expect(cardTitleElement).toBeTruthy();
        expect(cardTitleElement.nativeElement.textContent.trim()).toBe(cardTitleContent);
    });

    it('should render card extra', () => {
        component.extra = {} as TemplateRef<void>;
        fixture.detectChanges();

        const cardExtraElement = fixture.debugElement.query(By.css('.ant-card-extra'));
        expect(cardExtraElement).toBeTruthy();
    });

    it('should render actions wrapper with actions', () => {
        fixture.detectChanges();
        const actionsElement = fixture.debugElement.query(By.css('.ant-card-actions'));
        expect(actionsElement).toBeTruthy();
        expect(actionsElement.children.length).toEqual(1);
    });
});
