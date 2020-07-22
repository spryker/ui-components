import { LinkModule } from '../link.module';
import { IconErrorModule } from '@spryker/icon/icons';

export default {
  title: 'LinkComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [LinkModule, IconErrorModule],
  },
  template: `
    <spy-link [icon]="icon">Title Content</spy-link>
  `,
  props: {
    icon: IconErrorModule.icon,
  },
});
