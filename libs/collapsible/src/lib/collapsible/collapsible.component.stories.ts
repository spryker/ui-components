import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { CollapsibleComponent } from './collapsible.component';
import { CollapsibleModule } from '../collapsible.module';

@Component({
    standalone: false,
    selector: 'spy-story',
    template: ` Collapse Content `,
})
class StoryComponent {
    constructor() {
        console.info('Story component initialized');
    }
}

export default {
    title: 'CollapsibleComponent',
    component: CollapsibleComponent,
    tags: ['autodocs'],
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
            include: ['spyTitle', 'titleIcon', 'active', 'disabled', 'alwaysRender'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8983',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Collapsible panel component with expandable content.\n\n**Slots:**\n- Default slot: Collapsible panel content',
            },
        },
    },
    argTypes: {
        spyTitle: {
            control: { type: 'text' },
            description: 'Title text shown in the collapsible header',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        titleIcon: {
            control: { type: 'text' },
            description: 'Icon to display in the collapsible header',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        active: {
            control: { type: 'boolean' },
            description: 'Controls expanded/collapsed state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the collapsible preventing toggle interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        alwaysRender: {
            control: { type: 'boolean' },
            description: 'Keeps content rendered in DOM even when collapsed',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Inputs',
            },
        },
        activeChange: {
            description: 'Emits when active state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
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
