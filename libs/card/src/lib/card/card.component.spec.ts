import { Component, TemplateRef, NO_ERRORS_SCHEMA, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { CardComponent } from './card.component';
import { CardModule } from '../card.module';

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
    @Input() title: string | TemplateRef<void> = '';
    @Input() extra: TemplateRef<void> | undefined;
    @Input() hoverable: boolean | undefined;
}

describe('CardComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TestComponent, {
        ngModule: {
            imports: [CardModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: 'Content',
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should create component', async () => {
        const host = await createComponent({}, true);

        expect(host.component).toBeTruthy();
    });

    it('should be hoverable', async () => {
        const host = await createComponent({}, true);
        const card = host.queryCss('nz-card');

        expect(card).toBeTruthy();
        expect(card.classes['ant-card-hoverable']).toBeFalsy();

        host.setInputs({ hoverable: true }, true);

        expect(card.classes['ant-card-hoverable']).toBeTruthy();
    });

    it('should render card title with content', async () => {
        const cardTitleContent = 'Card Title';
        const host = await createComponent({ title: cardTitleContent }, true);

        const cardTitleElement = host.queryCss('.ant-card-head-title');

        expect(cardTitleElement).toBeTruthy();
        expect(cardTitleElement.nativeElement.textContent.trim()).toBe(cardTitleContent);
    });

    it('should render card extra', async() => {
        const host = await createComponent({ extra: {} as TemplateRef<void> }, true);
        const cardExtraElement = host.queryCss('.ant-card-extra');

        expect(cardExtraElement).toBeTruthy();
    });

    it('should render actions wrapper with actions', async () => {
        const host = await createComponent({}, true);
        const actionsElement = host.queryCss('.ant-card-actions');

        expect(actionsElement).toBeTruthy();
        expect(actionsElement.children.length).toEqual(1);
    });
});
