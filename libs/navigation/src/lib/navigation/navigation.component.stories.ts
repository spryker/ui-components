import { NavigationModule } from '../navigation.module';
import { NavigationComponent } from './navigation.component';

export default {
  title: 'NavigationComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NavigationModule],
  },
  component: NavigationComponent,
  props: {},
});
