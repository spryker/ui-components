import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DropdownModule } from '../dropdown.module';
import { DropdownComponent } from './dropdown.component';
import { IconModule } from '@spryker/icon';
import { IconCheckModule, IconInfoModule } from '@spryker/icon/icons';

export default {
    title: 'DropdownComponent',
    component: DropdownComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [DropdownModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['items', 'placement', 'visible', 'disabled'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9154',
            allowFullscreen: true,
        },
    },
    argTypes: {
        placement: {
            control: 'select',
            options: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'],
        },
    },
    args: {
        items: [
            { action: 'action1', title: 'item1' },
            { action: 'action2', title: 'item2' },
        ],
        placement: 'bottomRight',
        visible: false,
        disabled: false,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <div style="padding: 80px; display: flex; justify-content: center;">
      <spy-dropdown
        [items]="items"
        [placement]="placement"
        [visible]="visible"
        [disabled]="disabled">
        ICON
      </spy-dropdown>
    </div>
  `,
});

export const withIcon = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      DropdownModule,
      BrowserAnimationsModule,
      IconModule,
      IconCheckModule,
      IconInfoModule,
    ],
  },
  template: `
    <spy-dropdown [items]="items" [trigger]="trigger">ICON</spy-dropdown>
  `,
});

withIcon.args = {
  items: [
    {
      action: 'action1',
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam amet consectetur harum maxime optio porro quam ratione unde velit',
      icon: IconCheckModule.icon,
    },
    {
      action: 'action2',
      title: 'One line item',
      icon: IconInfoModule.icon,
    },
    { action: 'action3', title: 'Without icon' },
  ],
  trigger: 'hover',
};

withIcon.argTypes = {
  trigger: {
    control: { type: 'select' },
    options: ['click', 'hover'],
  },
};
