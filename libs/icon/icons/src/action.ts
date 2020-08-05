import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="4px" height="18px" viewBox="0 0 4 18" version="1.1">
    <title>Action</title>
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-621.000000, -1058.000000)">
            <path d="M623,1072 C624.104569,1072 625,1072.89543 625,1074 C625,1075.10457 624.104569,1076 623,1076 C621.895431,1076 621,1075.10457 621,1074 C621,1072.89543 621.895431,1072 623,1072 Z M623,1065 C624.104569,1065 625,1065.89543 625,1067 C625,1068.10457 624.104569,1069 623,1069 C621.895431,1069 621,1068.10457 621,1067 C621,1065.89543 621.895431,1065 623,1065 Z M623,1058 C624.104569,1058 625,1058.89543 625,1060 C625,1061.10457 624.104569,1062 623,1062 C621.895431,1062 621,1061.10457 621,1060 C621,1058.89543 621.895431,1058 623,1058 Z" id="actions"/>
        </g>
    </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconActionModule])],
})
export class IconActionModule {
  static icon = 'action';
  static svg = svg;
}
