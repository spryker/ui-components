import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { IconModule, provideIcons, Icon } from '@spryker/icon';
import { SelectModule } from '@spryker/select';
import { arrowIcon } from './pagination/images';

const icons: Icon[] = [
  {
    name: 'arrow',
    svg: arrowIcon,
  },
];

@NgModule({
  imports: [CommonModule, NzPaginationModule, IconModule, SelectModule],
  declarations: [PaginationComponent],
  providers: [provideIcons(icons)],
})
export class PaginationModule {}
