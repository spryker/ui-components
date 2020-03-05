import { TabsModule } from '../tabs.module';
import { TabsComponent } from './tabs.component';

export default {
  title: 'TabsComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TabsModule],
  },
  template: `
    <spy-tabs>
      <spy-tab title="Test Title 1">
        Tab Content 1
      </spy-tab>
      <spy-tab title="Test Title 2">
        Tab Content 2
      </spy-tab>
      <spy-tab title="Test Title 3" [hasWarning]="true">
        Tab Content 3
      </spy-tab>
    </spy-tabs>
  `,
});
