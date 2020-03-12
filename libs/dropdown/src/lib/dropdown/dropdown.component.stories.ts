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
  component: DropdownComponent,
  props: {
    items: [
      { action: '1234', title: '123' },
      { action: '2345', title: '234' },
    ],
  },
});
