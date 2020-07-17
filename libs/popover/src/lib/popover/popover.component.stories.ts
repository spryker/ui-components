import { PopoverModule } from '../popover.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonToggleModule } from '@spryker/button';

export default {
  title: 'PopoverComponent',
};

const mockArray = [...Array(30).keys()];

export const popover = () => ({
  moduleMetadata: {
    imports: [PopoverModule, ButtonToggleModule, BrowserAnimationsModule],
  },
  template: `
    <spy-popover>
      <spy-button-toggle trigger>Open popover</spy-button-toggle>
        <ul>
            <li *ngFor="let number of mockData">Popover content item {{ number }}</li>
        </ul>
      <div class="ant-popover-footer">
        <button>Reset</button>
      </div>
    </spy-popover>

  `,
  props: {
    mockData: mockArray,
  },
});
