import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleSwitcherComponent } from './locale-switcher.component';

describe('LocaleSwitcherComponent', () => {
    let component: LocaleSwitcherComponent;
    let fixture: ComponentFixture<LocaleSwitcherComponent>;

    beforeEach(waitForAsync(() => {
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
