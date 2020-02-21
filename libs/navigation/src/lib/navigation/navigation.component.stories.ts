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
  props: {
    items: [
      {
        title: 'Dashboard Dashboard Dashboard Dashboard Dashboard',
        url: '',
        icon: 'dashboard',
        isActive: false,
        subItems: [],
      },
      {
        title: 'Orders Orders Orders Orders Orders Orders Orders',
        url: '',
        icon: 'orders',
        isActive: false,
        subItems: [
          {
            title: 'Dashboard2',
            url: '',
            icon: '',
            isActive: false,
            subItems: [],
          },
          {
            title: 'Dashboard2',
            url: '',
            icon: '',
            isActive: false,
            subItems: [],
          },
          {
            title: 'Dashboard2',
            url: '',
            icon: '',
            isActive: false,
            subItems: [],
          },
          {
            title: 'Dashboard2',
            url: '',
            icon: '',
            isActive: false,
            subItems: [],
          },
        ],
      },
      { title: 'Offers', url: '', icon: 'offers', isActive: true, subItems: [] },
      {
        title: 'Merchant',
        url: '',
        icon: 'merchant',
        isActive: false,
        subItems: [],
      },
    ],
  },
});
