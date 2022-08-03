import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { DropdownModule } from '../dropdown.module';
import { DropdownComponent } from './dropdown.component';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '@spryker/icon';
import { IconCheckModule, IconInfoModule } from '@spryker/icon/icons';
import { select } from '@storybook/addon-knobs';

export default {
  title: 'DropdownComponent',
};

export const primary = () => ({
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
  props: {
=======

export default {
  title: 'DropdownComponent',
  component: DropdownComponent,
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
  args: {
>>>>>>> master
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
    trigger: select('Trigger', ['click', 'hover'], 'hover'),
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [DropdownModule, BrowserAnimationsModule],
  },
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
