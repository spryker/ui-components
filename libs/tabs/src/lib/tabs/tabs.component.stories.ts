import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconCalendarModule, IconUserModule } from '@spryker/icon/icons';
import { WebComponentsModule } from '@spryker/web-components';
import { boolean, select } from '@storybook/addon-knobs';

import { TabComponent } from '../tab/tab.component';
import { TabsModule } from '../tabs.module';
import { TabsComponent, TabsMode } from './tabs.component';

export default {
    title: 'TabsComponent',
};

const tabsData = [
    {
        title: 'Test Title 1',
        content: 'Tab Content 1',
    },
    {
        title: 'Test Title 2',
        content: 'Tab Content 2',
        disabled: true,
    },
    {
        title: 'Test Title 3',
        content: 'Tab Content 3',
        hasWarning: true,
    },
    {
        title: 'Test Title 4',
        content: 'Tab Content 4',
        iconName: 'calendar',
    },
    {
        title: 'Test Title 5',
        content: 'Tab Content 5',
        iconName: 'user',
    },
    {
        title: 'Test Title 6',
        content: 'Tab Content 6',
        hasWarning: true,
        iconName: 'user',
    },
    {
        title: 'Test Title 7',
        content: 'Tab Content 7',
    },
];

export const primary = () => ({
    moduleMetadata: {
        imports: [TabsModule, IconUserModule, IconCalendarModule, BrowserAnimationsModule],
    },
    template: `
    <spy-tabs [tab]="tab" [mode]="mode" [animateSlides]="animateSlides">
      <spy-tab
        *ngFor="let tab of tabsDataArray"
        [spyTitle]="tab.title"
        [disabled]="tab.disabled"
        [hasWarning]="tab.hasWarning"
        [iconName]="tab.iconName"
      >
        {{ tab.content }}
      </spy-tab>
    </spy-tabs>
  `,
    props: {
        tab: select('Selected tab index', [...new Array(tabsData.length).keys()], 0),
        mode: select('Mode', TabsMode, TabsMode.Card),
        animateSlides: boolean('Animate slides', false),
        tabsDataArray: tabsData,
    },
});

export const asWebComponents = () => ({
    moduleMetadata: {
        imports: [
            WebComponentsModule.forRoot(),
            WebComponentsModule.withComponents([
                { component: TabsComponent, isRoot: true },
                { component: TabComponent },
            ]),
            TabsModule,
        ],
        entryComponents: [TabsComponent, TabComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
    template: `
    <web-spy-tabs>
      <web-spy-tab spy-title="Test Title 1">
        Tab Content 1
      </web-spy-tab>
      <web-spy-tab spy-title="Test Title 2" disabled="true">
        Tab Content 2
      </web-spy-tab>
      <web-spy-tab spy-title="Test Title 3" has-warning="true">
        Tab Content 3
      </web-spy-tab>
    </web-spy-tabs>
  `,
});
