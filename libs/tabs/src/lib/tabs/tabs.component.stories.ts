import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { IconCalendarModule, IconUserModule } from '@spryker/icon/icons';
import { WebComponentsModule } from '@spryker/web-components';
import { StorybookModule } from '@spryker/web-components/storybook';

import { TabComponent } from '../tab/tab.component';
import { TabsModule } from '../tabs.module';
import { TabsComponent, TabsMode } from './tabs.component';

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

export default {
  title: 'TabsComponent',
  component: TabsComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: ['tab', 'mode', 'animateSlides', 'tabsDataArray'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8991',
      allowFullscreen: true,
    },
  },
  argTypes: {
    tab: {
      control: { type: 'select' },
      options: [...new Array(tabsData.length).keys()],
    },
    mode: {
      control: { type: 'select' },
      options: TabsMode,
    },
  },
  args: {
    tab: 0,
    mode: TabsMode.Card,
    animateSlides: false,
    tabsDataArray: tabsData,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      TabsModule,
      IconUserModule,
      IconCalendarModule,
      BrowserAnimationsModule,
    ],
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
});

export const withLimitTabs = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      TabsModule,
      IconUserModule,
      IconCalendarModule,
      BrowserAnimationsModule,
    ],
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
});
const tabsLargeData = [
  ...tabsData,
  {
    title: 'Test Title 8',
    content: 'Tab Content 8',
  },
  {
    title: 'Test Title 9',
    content: 'Tab Content 9',
  },
  {
    title: 'Test Title 10',
    content: 'Tab Content 10',
  },
  {
    title: 'Test Title 11',
    content: 'Tab Content 11',
  },
  {
    title: 'Test Title 12',
    content: 'Tab Content 12',
  },
];
withLimitTabs.args = {
  tabsDataArray: tabsLargeData,
};
withLimitTabs.argTypes = {
  tab: {
    options: [...new Array(tabsLargeData.length).keys()],
  },
};

export const asWebComponents = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      StorybookModule,
      WebComponentsModule.withComponents([TabsComponent, TabComponent]),
      TabsModule,
    ],
    entryComponents: [TabsComponent, TabComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-storybook>
      <web-spy-tabs
        [attr.tab]="tab"
        [attr.mode]="mode"
        [attr.animateSlides]="animateSlides">
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
    </web-spy-storybook>
  `,
});
asWebComponents.argTypes = {
  tab: {
    options: [0, 1, 2],
  },
  tabsDataArray: {
    table: {
      disable: true,
    },
  },
};
