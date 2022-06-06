import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActionsService } from '@spryker/actions';
import { ButtonShape, ButtonSize, ButtonType, ButtonVariant, ButtonModule } from '@spryker/button';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ButtonActionComponent } from './button-action.component';
import { EMPTY } from 'rxjs';

const mockConfig = {
    type: 'type',
    component: 'component',
    options: {
        inputs: {
            url: '/html-request',
        },
    },
};
const mockContext = {} as any;

class MockActionService implements Partial<ActionsService> {
    trigger = jest.fn();
}

describe('ButtonActionComponent', () => {
    let mockActionService: MockActionService;

    describe('Host functionality', () => {
        const { testModule, createComponent } = getTestingForComponent(ButtonActionComponent, {
            ngModule: { schemas: [NO_ERRORS_SCHEMA] },
            projectContent: 'Content',
        });

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [testModule],
                providers: [
                    MockActionService,
                    {
                        provide: ActionsService,
                        useExisting: MockActionService,
                    },
                ],
                teardown: { destroyAfterEach: false },
            });

            mockActionService = TestBed.inject(MockActionService);
        });

        it('should render <spy-button-action>', async () => {
            const host = await createComponent({}, true);
            const buttonActionElem = host.queryCss('spy-button-action');

            expect(buttonActionElem).toBeTruthy();
        });

        it('should call trigger() method by <spy-button> click', async () => {
            const host = await createComponent({ action: mockConfig, actionContext: mockContext }, true);
            const buttonElem = host.queryCss('spy-button');
            mockActionService.trigger.mockReturnValue(EMPTY);

            buttonElem?.triggerEventHandler('click', {});
            expect(mockActionService.trigger).toHaveBeenCalledWith(expect.any(Object), mockConfig, mockContext);
        });

        it('should render projected content inside <spy-button>', async () => {
            const host = await createComponent({}, true);
            const buttonElem = host.queryCss('spy-button');

            expect(buttonElem?.nativeElement.textContent).toMatch('Content');
        });

        describe('@Inputs', () => {
            it('should bind input `type` to type of <spy-button>', async () => {
                const host = await createComponent({ type: ButtonType.Submit }, true);
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem?.properties.type).toBe(ButtonType.Submit);
            });

            it('should bind input `variant` to variant of <spy-button>', async () => {
                const host = await createComponent({ variant: ButtonVariant.Secondary }, true);
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem?.properties.variant).toBe(ButtonVariant.Secondary);
            });

            it('should bind input `shape` to shape of <spy-button>', async () => {
                const host = await createComponent({ shape: ButtonShape.Round }, true);
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem?.properties.shape).toBe(ButtonShape.Round);
            });

            it('should bind input `size` to size of <spy-button>', async () => {
                const host = await createComponent({ size: ButtonSize.Small }, true);
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem?.properties.size).toBe(ButtonSize.Small);
            });

            it('should bind input `attrs` to attrs of <spy-button>', async () => {
                const host = await createComponent({ attrs: { disabled: 'true' } }, true);
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem?.properties.attrs).toEqual({ disabled: 'true' });
            });
        });
    });

    describe('Icon element', () => {
        const { testModule, createComponent } = getTestingForComponent(ButtonActionComponent, {
            ngModule: {
                schemas: [NO_ERRORS_SCHEMA],
                imports: [ButtonModule],
            },
            projectContent: `
          <span class="icon-element" icon></span>
        `,
        });

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [testModule],
                providers: [
                    MockActionService,
                    {
                        provide: ActionsService,
                        useExisting: MockActionService,
                    },
                ],
                teardown: { destroyAfterEach: false },
            });

            mockActionService = TestBed.inject(MockActionService);
        });

        it('should render icon inside <spy-button> in the `.spy-button-core__btn-icon` element', async () => {
            const host = await createComponent({}, true);
            const iconElement = host.queryCss('spy-button .spy-button-core__btn-icon .icon-element');

            expect(iconElement).toBeTruthy();
        });
    });
});
