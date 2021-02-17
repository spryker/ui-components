import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserMenuModule } from '../user-menu.module';
import { UserMenuComponent } from './user-menu.component';

export default {
  title: 'UserMenuComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [UserMenuModule, BrowserAnimationsModule]
  },
  component: UserMenuComponent,
  props: {
  }
})
