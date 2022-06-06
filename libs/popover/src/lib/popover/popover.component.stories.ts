import { PopoverModule } from '../popover.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
    title: 'PopoverComponent',
};

const mockArray = [...Array(10).keys()];

export const popover = () => ({
    moduleMetadata: {
        imports: [PopoverModule, BrowserAnimationsModule],
    },
    template: `
    <spy-popover>
    <button trigger>Open</button>
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
