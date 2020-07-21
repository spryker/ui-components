import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="24" height="24" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path d="M4.8 17.4c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788zm7.2 0c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788zm7.2 0c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788zM4.8 10.2c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788zm7.2 0c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788zm7.2 0c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788zM4.8 3c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788S3 5.776 3 4.788C3 3.801 3.806 3 4.8 3zM12 3c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788C10.2 3.801 11.006 3 12 3zm7.2 0c.994 0 1.8.8 1.8 1.788s-.806 1.788-1.8 1.788-1.8-.8-1.8-1.788c0-.987.806-1.788 1.8-1.788z" id="a"/>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <mask id="b" fill="#fff">
      <use xlink:href="#a"/>
    </mask>
    <use fill="#D4D5D7" xlink:href="#a"/>
    <g mask="url(#b)" fill="currentColor">
      <path d="M0 0h24v24H0z"/>
    </g>
  </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconDragModule])],
})
export class IconDragModule {
  static icon = 'drag';
  static svg = svg;
}
