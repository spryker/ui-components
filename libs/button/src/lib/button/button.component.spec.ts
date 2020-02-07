import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';


describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NzButtonModule],
            declarations: [ButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render button element with nz-button Ant directive', () => {
        const buttonElm = fixture.debugElement.query(By.css('button'));

        expect(buttonElm.nativeElement.hasAttribute('nz-button')).toBeTruthy();
    });

    it('is slot rendered inside internal button element', () => {
        const slotElm = fixture.debugElement.query(By.css('slot'));

        expect(slotElm.nativeElement).toBeTruthy();
    });
});
