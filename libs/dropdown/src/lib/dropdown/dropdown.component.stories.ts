import { DropdownModule } from '../dropdown.module';
import { DropdownComponent } from './dropdown.component';
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
});
