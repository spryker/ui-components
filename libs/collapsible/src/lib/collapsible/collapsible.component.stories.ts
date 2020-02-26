import { CollapsibleModule } from '../collapsible.module';

export default {
  title: 'CollapsibleComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [CollapsibleModule],
  },
  template: `
    <spy-collapsible title="Collapsible Title">
       <div>Collapse Content</div> 
    </spy-collapsible>
  `,
});
