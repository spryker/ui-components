import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { CollapsibleComponent } from './collapsible.component';
import { CollapsibleModule } from '../collapsible.module';

@Component({ standalone: false, selector: 'spy-story', template: ` Collapse Content ` })
class StoryComponent {
    constructor() {
        console.log('Story component initialized');
    }
}

export default {
    title: 'CollapsibleComponent',
    component: CollapsibleComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [CollapsibleModule],
            declarations: [StoryComponent],
        }),
    ],
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

export const primary = (args) => ({
    props: args,
    template: `
    <spy-collapsible
      [spyTitle]="spyTitle"
      [active]="active"
      [disabled]="disabled"
      [alwaysRender]="alwaysRender">
      <spy-story></spy-story>
    </spy-collapsible>
  `,
});

export const withTemplate = (args) => ({
    props: args,
    template: `
    <spy-collapsible
      [spyTitle]="spyTitle"
      [active]="active"
      [disabled]="disabled"
      [alwaysRender]="alwaysRender">
      <ng-template>
        <spy-story></spy-story>
      </ng-template>
    </spy-collapsible>
  `,
});
withTemplate.args = {
    spyTitle: 'Collapsible Template Title',
};
