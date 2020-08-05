import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="14px" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-905.000000, -1060.000000)">
            <path d="M922.435726,1063.37056 L912.639585,1073.42154 C912.262441,1073.80652 911.771768,1074 911.27917,1074 C910.786573,1074 910.293976,1073.80652 909.918756,1073.42154 L905.564274,1068.95378 C904.811909,1068.18382 904.811909,1066.93411 905.564274,1066.16217 C906.316639,1065.39023 907.532738,1065.39023 908.285103,1066.16217 L911.27917,1069.23413 L919.714897,1060.57895 C920.467262,1059.80702 921.683361,1059.80702 922.435726,1060.57895 C923.188091,1061.35089 923.188091,1062.59863 922.435726,1063.37056" id="checkmark"></path>
        </g>
    </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconCheckModule])],
})
export class IconCheckModule {
  static icon = 'check';
  static svg = svg;
}
