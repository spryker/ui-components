import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NotificationModule } from '@spryker/notification';
import { ButtonShape, ButtonSize, ButtonVariant } from '@spryker/button';
import { ButtonAjaxComponent, ButtonAjaxMethod } from './button-ajax.component';

@Component({
    standalone: false,
    imports: [ButtonAjaxComponent],
    template: `
        <spy-button-ajax
            [method]="method"
            [url]="url"
            [variant]="variant"
            [shape]="shape"
            [size]="size"
            [attrs]="attrs"
        >
            Content
        </spy-button-ajax>
    `,
})
class TestHostComponent {
    method?: ButtonAjaxMethod;
    url?: string;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    size?: ButtonSize;
    attrs?: Record<string, unknown>;
}

describe('ButtonAjaxComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NotificationModule.forRoot()],
            declarations: [ButtonAjaxComponent, TestHostComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();

        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should render <spy-button-ajax>', () => {
        const el = fixture.debugElement.query(By.css('spy-button-ajax'));
        expect(el).toBeTruthy();
    });

    it('should render projected content inside <spy-button-ajax>', () => {
        const el = fixture.debugElement.query(By.css('spy-button-ajax')).nativeElement as HTMLElement;
        expect(el.textContent).toMatch('Content');
    });

    it('should send request by selected method', () => {
        const mockPath = '/custom-path';
        fixture.componentInstance.method = ButtonAjaxMethod.Get;
        fixture.componentInstance.url = mockPath;
        fixture.detectChanges();

        const btnDe = fixture.debugElement.query(By.css('spy-button'));
        btnDe.triggerEventHandler('click', null);
        fixture.detectChanges();

        const req = httpTestingController.expectOne(mockPath);
        expect(req.request.method).toBe(ButtonAjaxMethod.Get);
    });

    it('should add appropriate @Input(variant), @Input(shape), @Input(size) props to the `<spy-button>`', () => {
        const mockedAttrs = { mockAttr: 'mockAttr' };
        fixture.componentInstance.variant = ButtonVariant.Critical;
        fixture.componentInstance.shape = ButtonShape.Circle;
        fixture.componentInstance.size = ButtonSize.Large;
        fixture.componentInstance.attrs = mockedAttrs;
        fixture.detectChanges();

        const btnDe = fixture.debugElement.query(By.css('spy-button'));
        expect(btnDe.properties.variant).toBe(ButtonVariant.Critical);
        expect(btnDe.properties.size).toBe(ButtonSize.Large);
        expect(btnDe.properties.shape).toBe(ButtonShape.Circle);
        expect(btnDe.properties.attrs).toBe(mockedAttrs);
    });

    it('should add loading state after click and remove it after response', () => {
        const mockPath = '/custom-path';
        fixture.componentInstance.method = ButtonAjaxMethod.Get;
        fixture.componentInstance.url = mockPath;
        fixture.detectChanges();

        const btnDe = fixture.debugElement.query(By.css('spy-button'));
        btnDe.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(btnDe.properties.loading).toBe(true);

        const req = httpTestingController.expectOne(mockPath);
        req.flush({});
        fixture.detectChanges();

        expect(btnDe.properties.loading).toBe(false);
    });
});
