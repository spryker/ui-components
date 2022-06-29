import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import {
  PopoverComponent,
  PopoverPosition,
  PopoverTrigger,
} from './popover.component';
import { PopoverModule } from '../popover.module';

export default {
  title: 'PopoverComponent',
  component: PopoverComponent,
  parameters: {
    controls: {
      include: ['open', 'popoverTrigger', 'position'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8986',
      allowFullscreen: true,
    },
  },
  argTypes: {
    popoverTrigger: {
      control: { type: 'select' },
      options: PopoverTrigger,
    },
  },
  args: {
    popoverTrigger: PopoverTrigger.Click,
    position: PopoverPosition.Bottom,
  },
} as Meta;

export const popover = (args) => ({
  props: {
    ...args,
    mockData: [...Array(3).keys()],
  },
  moduleMetadata: {
    imports: [PopoverModule, BrowserAnimationsModule],
  },
  template: `
    <div style="padding: 100px; display: flex; justify-content: center;">
      <spy-popover
        [position]="position"
        [popoverTrigger]="popoverTrigger"
        [open]="open">
        <button trigger>Open</button>
        <ul>
          <li *ngFor="let number of mockData">Popover content item {{ number + 1 }}</li>
        </ul>
      </spy-popover>
    </div>
  `,
});
