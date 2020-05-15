import { DropdownModule } from '../dropdown.module';
import { DropdownComponent } from './dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'DropdownComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [DropdownModule, BrowserAnimationsModule],
  },
  template: `
    <spy-dropdown [items]="items">ICON</spy-dropdown>
  `,
  props: {
    items: [
      { action: 'action1', title: 'item1' },
      { action: 'action2', title: 'item2' },
    ],
  },
});
