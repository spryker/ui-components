import { ChipsComponent } from './chips.component';
import { ChipsModule } from '../chips.module';

export default {
    title: 'ChipsComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [ChipsModule],
    },
    component: ChipsComponent,
    template: `
    <spy-chips [color]="color">Text</spy-chips>
  `,
    props: {
        color: 'red',
    },
});
