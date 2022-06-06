import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocaleSwitcherComponent } from './locale-switcher.component';

xdescribe('LocaleSwitcherComponent', () => {
    let component: LocaleSwitcherComponent;
    let fixture: ComponentFixture<LocaleSwitcherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LocaleSwitcherComponent],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocaleSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
