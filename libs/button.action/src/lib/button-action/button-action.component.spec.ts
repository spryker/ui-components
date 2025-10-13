import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionsService } from '@spryker/actions';
import { ButtonModule, ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '@spryker/button';
import { EMPTY } from 'rxjs';
import { ButtonActionComponent } from './button-action.component';

const mockConfig = {
    type: 'type',
    component: 'component',
    options: { inputs: { url: '/html-request' } },
};
const mockContext = {} as any;

class MockActionService implements Partial<ActionsService> {
    trigger = jest.fn();
}

@Component({
    standalone: false,
    template: `
        <spy-button-action
            [action]="action"
            [actionContext]="actionContext"
            [type]="type"
            [variant]="variant"
            [shape]="shape"
            [size]="size"
            [attrs]="attrs"
        >
            Content
        </spy-button-action>
    `,
})
class TestHostComponent {
    action?: typeof mockConfig;
    actionContext?: any;
    type?: ButtonType;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    size?: ButtonSize;
    attrs?: Record<string, unknown>;
}

describe('ButtonActionComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let mockActionService: MockActionService;

    describe('Host functionality', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ButtonActionComponent, TestHostComponent],
                providers: [MockActionService, { provide: ActionsService, useExisting: MockActionService }],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: false },
            });

            mockActionService = TestBed.inject(MockActionService);
            fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
        });

        it('should render <spy-button-action>', () => {
            const el = fixture.debugElement.query(By.css('spy-button-action'));
            expect(el).toBeTruthy();
        });

        it('should call trigger() method by <spy-button> click', () => {
            fixture.componentInstance.action = mockConfig;
            fixture.componentInstance.actionContext = mockContext;
            fixture.detectChanges();

            const btnDe = fixture.debugElement.query(By.css('spy-button'));
            mockActionService.trigger.mockReturnValue(EMPTY);
            btnDe.triggerEventHandler('click', {});
            fixture.detectChanges();

            expect(mockActionService.trigger).toHaveBeenCalledWith(expect.any(Object), mockConfig, mockContext);
        });

        it('should render projected content inside <spy-button>', () => {
            const btnEl = fixture.debugElement.query(By.css('spy-button')).nativeElement as HTMLElement;
            expect(btnEl.textContent).toMatch('Content');
        });

        describe('@Inputs', () => {
            it('should bind input `type` to type of <spy-button>', () => {
                fixture.componentInstance.type = ButtonType.Submit;
                fixture.detectChanges();
                const btnDe = fixture.debugElement.query(By.css('spy-button'));
                expect(btnDe.properties.type).toBe(ButtonType.Submit);
            });

            it('should bind input `variant` to variant of <spy-button>', () => {
                fixture.componentInstance.variant = ButtonVariant.Secondary;
                fixture.detectChanges();
                const btnDe = fixture.debugElement.query(By.css('spy-button'));
                expect(btnDe.properties.variant).toBe(ButtonVariant.Secondary);
            });

            it('should bind input `shape` to shape of <spy-button>', () => {
                fixture.componentInstance.shape = ButtonShape.Round;
                fixture.detectChanges();
                const btnDe = fixture.debugElement.query(By.css('spy-button'));
                expect(btnDe.properties.shape).toBe(ButtonShape.Round);
            });

            it('should bind input `size` to size of <spy-button>', () => {
                fixture.componentInstance.size = ButtonSize.Small;
                fixture.detectChanges();
                const btnDe = fixture.debugElement.query(By.css('spy-button'));
                expect(btnDe.properties.size).toBe(ButtonSize.Small);
            });

            it('should bind input `attrs` to attrs of <spy-button>', () => {
                fixture.componentInstance.attrs = { disabled: 'true' };
                fixture.detectChanges();
                const btnDe = fixture.debugElement.query(By.css('spy-button'));
                expect(btnDe.properties.attrs).toEqual({ disabled: 'true' });
            });
        });
    });

    @Component({
        standalone: false,
        imports: [ButtonModule],
        template: `
            <spy-button-action>
                <span class="icon-element" icon></span>
            </spy-button-action>
        `,
    })
    class TestHostWithIconComponent {}

    describe('Icon element', () => {
        let iconFixture: ComponentFixture<TestHostWithIconComponent>;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                declarations: [ButtonActionComponent, TestHostWithIconComponent],
                imports: [ButtonModule],
                providers: [MockActionService, { provide: ActionsService, useExisting: MockActionService }],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: false },
            });

            mockActionService = TestBed.inject(MockActionService);
            iconFixture = TestBed.createComponent(TestHostWithIconComponent);
            iconFixture.detectChanges();
        });

        it('should render icon inside <spy-button> in the `.spy-button-core__btn-icon` element', () => {
            const iconEl = iconFixture.debugElement.query(
                By.css('spy-button .spy-button-core__btn-icon .icon-element'),
            );
            expect(iconEl).toBeTruthy();
        });
    });
});
