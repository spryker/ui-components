import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzDropDownModule, NzDropDownDirective } from 'ng-zorro-antd/dropdown';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent (refactored)', () => {
    let fixture: ComponentFixture<DropdownComponent>;

    const q = (sel: string) => fixture.debugElement.query(By.css(sel));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DropdownComponent],
            imports: [NzDropDownModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(DropdownComponent);
        fixture.detectChanges();
    });

    it('renders span[nz-dropdown] and nz-dropdown-menu', () => {
        const spanElem = q('span[nz-dropdown]');
        const menuElem = q('nz-dropdown-menu');
        expect(spanElem).toBeTruthy();
        expect(menuElem).toBeTruthy();
    });

    describe('Inputs bound to span', () => {
        it('placement -> nzPlacement', () => {
            fixture.componentRef.setInput('placement', 'bottomLeft');
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropDownDirective);
            expect(dir.nzPlacement).toBe('bottomLeft');
        });

        it('disabled -> nzDisabled', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropDownDirective);
            expect(dir.nzDisabled).toBe(true);
        });

        it('visible -> nzVisible', () => {
            fixture.componentRef.setInput('visible', true);
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropDownDirective);
            expect(dir.nzVisible).toBe(true);
        });

        it('trigger -> nzTrigger', () => {
            fixture.componentRef.setInput('trigger', 'hover');
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropDownDirective);
            expect(dir.nzTrigger).toBe('hover');
        });
    });

    it('emits visibleChange when nzVisibleChange fires', () => {
        const emitSpy = jest.spyOn(fixture.componentInstance.visibleChange, 'emit');
        q('span[nz-dropdown]').triggerEventHandler('nzVisibleChange', false);
        fixture.detectChanges();
        expect(emitSpy).toHaveBeenCalledWith(false);
    });
});
