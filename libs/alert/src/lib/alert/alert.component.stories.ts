import { AlertComponent } from './alert.component';
import { AlertModule } from '../alert.module';

export default {
  title: 'AlertComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [AlertModule]
  },
  template: `
    <spy-alert>Some message</spy-alert>
  `,
  props: {
  }
})
