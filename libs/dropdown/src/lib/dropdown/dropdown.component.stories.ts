import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { DropdownModule } from '../dropdown.module';
import { DropdownComponent } from './dropdown.component';

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
    items: [
      { action: 'action1', title: 'item1' },
      { action: 'action2', title: 'item2' },
    ],
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
