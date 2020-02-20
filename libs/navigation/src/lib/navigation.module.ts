import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const svgIcon = `<svg viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" class=""></path></svg>`;

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule,  NzMenuModule, IconModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  providers: [
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'home',
        svg: function() {
          return new Promise(resolve => {
            resolve(svgIcon);
          });
        },
      },
      multi: true,
    },
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'home2',
        svg: function() {
          return new Promise(resolve => {
            resolve(svgIcon);
          });
        },
      },
      multi: true,
    },
  ],
})
export class NavigationModule {}
