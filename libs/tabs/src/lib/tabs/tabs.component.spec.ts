import { Component, Input } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsComponent, TabsMode } from './tabs.component';
import { TabComponent } from '../tab/tab.component';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IconModule } from '@spryker/icon';
import { IconErrorModule } from '@spryker/icon/icons';
import { SelectComponentsModule } from '@spryker/web-components';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    standalone: false,
    selector: 'test-host',
    template: `
        <spy-tabs [tab]="tab" [mode]="mode" [animateSlides]="animateSlides" (tabChange)="onTabChange($event)">
            <spy-tab spyTitle="Tab Title 1" iconName="user"> Tab Content 1 </spy-tab>
            <spy-tab spyTitle="Tab Title 2" hasWarning="true"> Tab Content 2 </spy-tab>
            <spy-tab spyTitle="Tab Title 3" hasWarning="true" iconName="user"> Tab Content 3 </spy-tab>
        </spy-tabs>
    `,
})
class HostComponent {
    @Input() tab = 0;
    @Input() mode: TabsMode | string = TabsMode.Line;
    @Input() animateSlides = false;
    onTabChange = jest.fn();
}

describe('TabsComponent', () => {
    let fixture: any;
    let host: HostComponent;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));
    const getTabsCmp = () => fixture.debugElement.query(By.directive(TabsComponent)).componentInstance as TabsComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                NzTabsModule,
                IconModule,
                IconErrorModule,
                SelectComponentsModule,
                NoopAnimationsModule,
            ],
            declarations: [HostComponent, TabsComponent, TabComponent],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Host functionality', () => {
        it('should render <nz-tabs>', async () => {
            expect(q('nz-tabs')).toBeTruthy();
        });

        it('should render projected content inside <span class="ant-tabs-projected-content">', async () => {
            const spanWrapper = q('.ant-tabs-projected-content');
            expect(spanWrapper.nativeElement.querySelector('spy-tab')).toBeTruthy();
        });

        describe('@Input(tab)', () => {
            it('should by default have value 0', async () => {
                expect(getTabsCmp().tab).toBe(0);
            });

            it('should bind to `nzSelectedIndex` of <nz-tabs>', async () => {
                fixture.componentRef.setInput('tab', 1);
                fixture.detectChanges();

                const tabsElement = q('nz-tabs');
                expect(tabsElement.componentInstance.nzSelectedIndex).toBe(1);
            });
        });

        describe('@Input(mode)', () => {
            it('should by default have value `line`', async () => {
                expect(getTabsCmp().mode).toBe('line');
            });

            it('should bind to `nzType` of <nz-tabs>', async () => {
                fixture.componentRef.setInput('mode', TabsMode.Card);
                fixture.detectChanges();

                const tabsElement = q('nz-tabs');
                expect(tabsElement.componentInstance.nzType).toBe(TabsMode.Card);
            });
        });

        describe('@Input(animateSlides)', () => {
            it('should bind to `nzAnimated` of <nz-tabs>', async () => {
                fixture.componentRef.setInput('animateSlides', true);
                fixture.detectChanges();

                const tabsElement = q('nz-tabs');
                expect(tabsElement.componentInstance.nzAnimated).toBe(true);
            });
        });

        describe('component.toNextTab', () => {
            it('should increase tab property', async () => {
                getTabsCmp().tab = 0;
                fixture.detectChanges();

                getTabsCmp().toNextTab();
                fixture.detectChanges();

                expect(getTabsCmp().tab).toBe(1);
            });

            it('should emit tabChange on toNextTab', async () => {
                getTabsCmp().tab = 0;
                fixture.detectChanges();

                getTabsCmp().toNextTab();
                fixture.detectChanges();

                expect(host.onTabChange).toHaveBeenCalledWith(1);
            });
        });

        describe('component.toPrevTab', () => {
            it('should decrease tab property', async () => {
                getTabsCmp().tab = 1;
                fixture.detectChanges();

                getTabsCmp().toPrevTab();
                fixture.detectChanges();

                expect(getTabsCmp().tab).toBe(0);
            });

            it('should emit tabChange on toPrevTab', async () => {
                getTabsCmp().tab = 1;
                fixture.detectChanges();

                getTabsCmp().toPrevTab();
                fixture.detectChanges();

                expect(host.onTabChange).toHaveBeenCalledWith(0);
            });
        });

        describe('component.activateTab', () => {
            it('should change tab property with new value', async () => {
                getTabsCmp().tab = 0;
                fixture.detectChanges();

                getTabsCmp().activateTab(1);
                fixture.detectChanges();

                expect(getTabsCmp().tab).toBe(1);
            });

            it('should emit tabChange on activateTab', async () => {
                getTabsCmp().tab = 0;
                fixture.detectChanges();

                getTabsCmp().activateTab(1);
                fixture.detectChanges();

                expect(host.onTabChange).toHaveBeenCalled();
            });
        });
    });

    describe('Tabs header `icons`', () => {
        it('should render <spy-icon> element inside the tab if `iconName` attribute exists', fakeAsync(async () => {
            tick(0);
            fixture.detectChanges();
            tick(0);
            fixture.detectChanges();

            // Wait for tabs to be processed
            await fixture.whenStable();
            fixture.detectChanges();

            const iconElems = qAll('spy-icon');
            expect(iconElems[0]).toBeTruthy();
            expect(iconElems[0].componentInstance.name).toBe('user');
        }));

        it('should render <spy-icon> element inside the tab if `hasWarning` attribute exists', fakeAsync(async () => {
            tick(0);
            fixture.detectChanges();
            tick(0);
            fixture.detectChanges();

            // Wait for tabs to be processed
            await fixture.whenStable();
            fixture.detectChanges();

            const iconElems = qAll('spy-icon');
            expect(iconElems[1]).toBeTruthy();
            expect(iconElems[1].componentInstance.name).toBe('error');
        }));

        it('should render <spy-icon> element inside the tab if `hasWarning` and `iconName` attributes exists', fakeAsync(async () => {
            tick(0);
            fixture.detectChanges();
            tick(0);
            fixture.detectChanges();

            // Wait for tabs to be processed
            await fixture.whenStable();
            fixture.detectChanges();

            const iconElems = qAll('spy-icon');
            expect(iconElems[2]).toBeTruthy();
            expect(iconElems[2].componentInstance.name).toBe('user');
        }));
    });
});
