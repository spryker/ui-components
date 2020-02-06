import { ButtonComponent } from './button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

export default {
    title: 'ButtonComponent'
}

export const primary = () => ({
    moduleMetadata: {
        imports: [NzButtonModule]
    },
    component: ButtonComponent,
    props: {}
});
