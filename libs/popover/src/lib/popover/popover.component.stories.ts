import { PopoverModule } from '../popover.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonToggleModule } from '@spryker/button';
import { IconModule } from '@spryker/icon';
import { IconSettingsModule } from '@spryker/icon/icons';
import { boolean } from '@storybook/addon-knobs';
import { open } from 'fs';

export default {
  title: 'PopoverComponent',
};

const mockArray = [...Array(10).keys()];

export const popover = () => ({
  moduleMetadata: {
    imports: [
      PopoverModule,
      ButtonToggleModule,
      BrowserAnimationsModule,
      IconModule,
      IconSettingsModule,
    ],
  },
  template: `
    <spy-popover (openChange)="buttonToggled = !buttonToggled">
      <spy-button-toggle trigger [toggled]="buttonToggled">
        <spy-icon name="settings"></spy-icon>
      </spy-button-toggle>
      <ul>
          <li *ngFor="let number of mockData">Popover content item {{ number + 1 }}</li>
      </ul>
    </spy-popover>
  `,
  props: {
    mockData: mockArray,
    buttonToggled: false,
  },
});
