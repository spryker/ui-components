import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import { InternalIconService } from './internal-icon.service';
import { provideIcons } from './tokens';

const promiseIcon = 'promise';
const stringIcon = 'string';

@Component({
    standalone: false,
    template: `<spy-icon [name]="name"></spy-icon>`,
})
class HostComponent {
    @Input() name?: string;
}

describe('IconComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IconComponent, HostComponent],
            providers: [
                provideIcons([
                    { icon: promiseIcon, svg: () => Promise.resolve('<svg></svg>') },
                    { icon: stringIcon, svg: '<svg></svg>' },
                ]),
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        TestBed.inject(InternalIconService).init();
    });

    it('compiles', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        const iconDe = fixture.debugElement.query(By.directive(IconComponent));
        expect(iconDe).toBeTruthy();
    });

    describe('host class spy-icon-[name]', () => {
        it('adds class when name is set', () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.name = 'name';
            fixture.detectChanges();

            const iconDe = fixture.debugElement.query(By.directive(IconComponent));
            const hostEl: HTMLElement = iconDe.nativeElement;

            expect(hostEl.classList.contains('spy-icon-name')).toBe(true);
        });

        it('updates class when name changes', () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.name = 'name';
            fixture.detectChanges();

            const iconDe = fixture.debugElement.query(By.directive(IconComponent));
            const hostEl: HTMLElement = iconDe.nativeElement;

            expect(hostEl.classList.contains('spy-icon-name')).toBe(true);

            fixture.componentInstance.name = 'new-name';
            fixture.detectChanges();

            expect(hostEl.classList.contains('spy-icon-new-name')).toBe(true);
            expect(hostEl.classList.contains('spy-icon-name')).toBe(false);
        });
    });

    describe('@Input(name)', () => {
        it('renders <i> with nzType from promise icon', fakeAsync(() => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.name = promiseIcon;
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            const iDe = fixture.debugElement.query(By.css('i[nz-icon]'));
            console.log(iDe, 'iDe');
            expect(iDe).toBeTruthy();
            expect(iDe.nativeNode.nzType).toBe(promiseIcon);
        }));

        it('renders <i> with nzType from string icon', fakeAsync(() => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.name = stringIcon;
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            const iDe = fixture.debugElement.query(By.css('i[nz-icon]'));
            expect(iDe).toBeTruthy();
            expect(iDe.nativeNode.nzType).toBe(stringIcon);
        }));

        it('re-renders <i> when name changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.name = promiseIcon;
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            let iDe = fixture.debugElement.query(By.css('i[nz-icon]'));
            expect(iDe.nativeNode.nzType).toBe(promiseIcon);

            fixture.componentInstance.name = stringIcon;
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            iDe = fixture.debugElement.query(By.css('i[nz-icon]'));
            expect(iDe.nativeNode.nzType).toBe(stringIcon);
        }));
    });
});
