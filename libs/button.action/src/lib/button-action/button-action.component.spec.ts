import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActionsService } from '@spryker/actions';
import { ButtonShape, ButtonSize, ButtonType, ButtonVariant, ButtonModule } from '@spryker/button';
import { createComponentWrapper } from '@spryker/internal-utils';
import { EMPTY } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ButtonActionComponent } from './button-action.component';

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
            const host = await createComponentWrapper(createComponent);
            const buttonActionElem = host.queryCss('spy-button-action');

            expect(buttonActionElem).toBeTruthy();
        });

        it('should call trigger() method by <spy-button> click', async () => {
            const host = await createComponentWrapper(createComponent, {
                action: mockConfig,
                actionContext: mockContext,
            });
            const buttonElem = host.queryCss('spy-button');

            mockActionService.trigger.mockReturnValue(EMPTY);
            buttonElem.triggerEventHandler('click', {});
            host.detectChanges();

            expect(mockActionService.trigger).toHaveBeenCalledWith(expect.any(Object), mockConfig, mockContext);
        });

        it('should render projected content inside <spy-button>', async () => {
            const host = await createComponentWrapper(createComponent);
            const buttonElem = host.queryCss('spy-button');

            expect(buttonElem.nativeElement.textContent).toMatch('Content');
        });

        describe('@Inputs', () => {
            it('should bind input `type` to type of <spy-button>', async () => {
                const host = await createComponentWrapper(createComponent, { type: ButtonType.Submit });
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem.properties.type).toBe(ButtonType.Submit);
            });

            it('should bind input `variant` to variant of <spy-button>', async () => {
                const host = await createComponentWrapper(createComponent, { variant: ButtonVariant.Secondary });
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem.properties.variant).toBe(ButtonVariant.Secondary);
            });

            it('should bind input `shape` to shape of <spy-button>', async () => {
                const host = await createComponentWrapper(createComponent, { shape: ButtonShape.Round });
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem.properties.shape).toBe(ButtonShape.Round);
            });

            it('should bind input `size` to size of <spy-button>', async () => {
                const host = await createComponentWrapper(createComponent, { size: ButtonSize.Small });
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem.properties.size).toBe(ButtonSize.Small);
            });

            it('should bind input `attrs` to attrs of <spy-button>', async () => {
                const host = await createComponentWrapper(createComponent, { attrs: { disabled: 'true' } });
                const buttonElem = host.queryCss('spy-button');

                expect(buttonElem.properties.attrs).toEqual({
                    disabled: 'true',
                });
            });
        });
    });

    describe('Icon element', () => {
        const { testModule, createComponent } = getTestingForComponent(ButtonActionComponent, {
            ngModule: {
                schemas: [NO_ERRORS_SCHEMA],
                imports: [ButtonModule],
            },
            projectContent: `<span class="icon-element" icon></span>`,
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
            const host = await createComponentWrapper(createComponent);
            const iconElement = host.queryCss('spy-button .spy-button-core__btn-icon .icon-element');

            expect(iconElement).toBeTruthy();
        });
    });
});
