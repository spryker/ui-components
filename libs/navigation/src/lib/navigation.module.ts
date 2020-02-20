import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { dashboardIcon, ordersIcon, merchantIcon, offerIcon } from './navigation/navigation.component.icons'


@NgModule({
  imports: [CommonModule, BrowserAnimationsModule,  NzMenuModule, IconModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  providers: [
    {
      provide: ICONS_TOKEN,
      useValue: [
        {
          name: 'dashboard',
          svg: function() {
            return new Promise(resolve => {
              resolve(dashboardIcon);
            });
          },
        },
        {
          name: 'orders',
          svg: function() {
            return new Promise(resolve => {
              resolve(ordersIcon);
            });
          },
        },
        {
          name: 'offers',
          svg: function() {
            return new Promise(resolve => {
              resolve(offerIcon);
            });
          },
        },
        {
          name: 'merchant',
          svg: function() {
            return new Promise(resolve => {
              resolve(merchantIcon);
            });
          },
        }
      ]
    },
  ],
})
export class NavigationModule {}
