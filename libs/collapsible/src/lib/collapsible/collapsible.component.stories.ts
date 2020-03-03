import { CollapsibleModule } from '../collapsible.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'CollapsibleComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [CollapsibleModule, BrowserAnimationsModule],
  },
  template: `
    <spy-collapsible title="Collapsible Title">
       <div>Collapse Content</div> 
    </spy-collapsible>
  `,
});
