import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxModule } from '../checkbox.module';

/**
 * `checkbox.component.spec.ts` renders with `NO_ERRORS_SCHEMA` and no `NzCheckboxModule`, so
 * `nz-checkbox` is inert there and the label comes out empty. These tests render the real thing.
 *
 * What they pin is the reason `@angular-eslint/template/label-has-associated-control` is
 * configured to accept `<label nz-checkbox>` as associated (see the root `eslint.config.mjs`):
 * the association is implicit — ng-zorro renders the
 * native `<input type="checkbox">` INSIDE the label host — and the linter cannot see through the
 * component boundary to know that. If an ng-zorro upgrade ever moves that input out of the label,
 * the association silently breaks and the lint configuration becomes a lie; this fails first.
 *
 * `RadioComponent` needs no equivalent: `radio.component.spec.ts` already queries
 * `label[nz-radio] input` under both `NzRadioModule` and `RadioModule`.
 */
@Component({
    standalone: false,
    template: `<spy-checkbox>Label</spy-checkbox>`,
})
class TestHostComponent {}

describe('CheckboxComponent (label association)', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [CheckboxModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('must render the native checkbox INSIDE the <label>, which is what associates the two', () => {
        const inputDe = fixture.debugElement.query(By.css('label[nz-checkbox] input[type="checkbox"]'));

        expect(inputDe).toBeTruthy();
    });

    it('must render the projected content inside that same <label>, so it names the control', () => {
        const labelEl: HTMLLabelElement = fixture.debugElement.query(By.css('label[nz-checkbox]')).nativeElement;

        expect(labelEl.textContent).toMatch('Label');
    });
});
