import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { CollapsibleComponent } from './collapsible.component';
import { CollapsibleModule } from '../collapsible.module';

export default {
  title: 'CollapsibleComponent',
  component: CollapsibleComponent,
  parameters: {
    controls: {
      include: ['spyTitle', 'active', 'disabled', 'alwaysRender'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8983',
      allowFullscreen: true,
    },
  },
  args: {
    spyTitle: 'Collapsible Title',
    alwaysRender: false,
  },
} as Meta;

@Component({
  selector: 'spy-story',
  template: ` Collapse Content `,
})
class StoryComponent {
  constructor() {
    console.log('Story component initialized');
  }
}

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [CollapsibleModule, BrowserAnimationsModule],
    declarations: [StoryComponent],
  },
  template: `
    <spy-collapsible [spyTitle]="spyTitle" [alwaysRender]="alwaysRender">
      <spy-story></spy-story>
    </spy-collapsible>
  `,
});

export const withTemplate = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [CollapsibleModule, BrowserAnimationsModule],
    declarations: [StoryComponent],
  },
  template: `
    <spy-collapsible [spyTitle]="spyTitle" [alwaysRender]="alwaysRender">
      <ng-template>
        <spy-story></spy-story>
      </ng-template>
    </spy-collapsible>
  `,
});
withTemplate.args = {
  spyTitle: 'Collapsible Template Title',
};
