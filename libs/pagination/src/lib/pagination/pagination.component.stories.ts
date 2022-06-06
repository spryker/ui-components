import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '../pagination.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
    title: 'PaginationComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [PaginationModule, NzPaginationModule, BrowserAnimationsModule],
    },
    component: PaginationComponent,
    props: {
        total: 300,
    },
});
