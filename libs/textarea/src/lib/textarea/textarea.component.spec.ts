import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApplyAttrsModule } from '@spryker/utils';
import { TextareaComponent } from './textarea.component';

@Component({
    standalone: false,
    selector: 'spy-host-cmp',
    template: `<spy-textarea
        [placeholder]="placeholder"
        [value]="value"
        [name]="name"
        [disabled]="disabled"
        [rows]="rows"
        [cols]="cols"
        [attrs]="attrs"
    ></spy-textarea>`,
})
class HostComponent {
    @Input() placeholder?: string;
    @Input() value?: string;
    @Input() name?: string;
    @Input() disabled?: boolean;
    @Input() rows?: number;
    @Input() cols?: number;
    @Input() attrs?: any;
}

describe('TextareaComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApplyAttrsModule],
            declarations: [HostComponent, TextareaComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('template must render <textarea> with [nz-input] from Ant Design', async () => {
        expect(q('textarea[nz-input]')).toBeTruthy();
    });

    describe('Inputs must be bound to internal <textarea>', () => {
        it('should bind `placeholder` to `placeholder` attribute of <textarea>', async () => {
            fixture.componentRef.setInput('placeholder', 'test placeholder');
            fixture.detectChanges();

            expect(q('textarea').attributes.placeholder).toBe('test placeholder');
        });

        it('should bind `value` to `value` of <textarea>', async () => {
            fixture.componentRef.setInput('value', 'test value');
            fixture.detectChanges();

            expect(q('textarea').properties.value).toBe('test value');
        });

        it('should bind `name` to `name` attribute of <textarea>', async () => {
            fixture.componentRef.setInput('name', 'test name');
            fixture.detectChanges();

            expect(q('textarea').attributes.name).toBe('test name');
        });

        it('should bind `disabled` to `disabled` of <textarea>', async () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(q('textarea').properties.disabled).toBe(true);
        });

        it('should bind `rows` to `rows` attribute of <textarea>', async () => {
            fixture.componentRef.setInput('rows', 2);
            fixture.detectChanges();

            expect(Number(q('textarea').attributes.rows)).toBe(2);
        });

        it('should bind `cols` to `cols` attribute of <textarea>', async () => {
            fixture.componentRef.setInput('cols', 2);
            fixture.detectChanges();

            expect(Number(q('textarea').attributes.cols)).toBe(2);
        });
    });

    describe('Input attrs', () => {
        it('should parse and bind `attrs` to the appropriate attributes of <textarea>', async () => {
            fixture.componentRef.setInput('attrs', { test: 'attr1', test2: 'attr2' });
            fixture.detectChanges();

            const textarea = q('textarea');
            expect(textarea.attributes['test']).toBe('attr1');
            expect(textarea.attributes['test2']).toBe('attr2');
        });

        it('should `attrs` updates appropriate attributes when changed', async () => {
            fixture.componentRef.setInput('attrs', { test: 'attr1', test2: 'attr2' });
            fixture.detectChanges();

            fixture.componentRef.setInput('attrs', { test: 'attr6' });
            fixture.detectChanges();

            const textarea = q('textarea');
            expect(textarea.attributes['test']).toBe('attr6');
            expect(textarea.attributes['test2']).toBeUndefined();

            fixture.componentRef.setInput('attrs', null);
            fixture.detectChanges();

            expect(q('textarea').attributes['test']).toBeUndefined();
        });
    });

    it('template must render <textarea> with [nzAutosize] property', async () => {
        expect(q('textarea').properties).toHaveProperty('nzAutosize');
    });
});
