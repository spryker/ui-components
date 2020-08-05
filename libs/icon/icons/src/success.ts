import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
    <title>success@2x</title>
    <desc>Created with Sketch.</desc>
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-89.000000, -1303.000000)" fill-rule="nonzero">
            <path d="M99.9967125,1303 C106.069276,1302.99818 110.994551,1307.91757 111.000001,1313.99013 C110.994561,1320.06846 106.06846,1324.99456 99.9901326,1325 C93.9175712,1324.99455 88.9981848,1320.06928 89.0000005,1313.99671 C89.0018172,1307.92415 93.9241489,1303.00182 99.9967125,1303 Z M99.9901326,1305.26905 C96.4578984,1305.26905 93.2736573,1307.39735 91.9228533,1310.66109 C90.5720492,1313.92483 91.3208416,1317.68094 93.8199199,1320.1772 C96.3189982,1322.67345 100.075949,1323.418 103.338161,1322.0635 C106.600373,1320.70901 108.725067,1317.52236 108.721081,1313.99013 C108.710208,1309.17427 104.806002,1305.27448 99.9901326,1305.26905 Z M104.707903,1310.27864 C105.131595,1310.39217 105.462536,1310.72311 105.576064,1311.1468 C105.689592,1311.57049 105.568459,1312.02257 105.258295,1312.33273 L99.8421505,1317.78834 C99.6124829,1318.01969 99.2999773,1318.1498 98.9739889,1318.1498 C98.6480004,1318.1498 98.3354949,1318.01969 98.1058273,1317.78834 L95.4224188,1315.06547 C95.1122545,1314.7553 94.9911215,1314.30323 95.1046495,1313.87954 C95.2181775,1313.45585 95.5491189,1313.1249 95.9728111,1313.01138 C96.3965034,1312.89785 96.8485777,1313.01898 97.1587419,1313.32915 L98.7569485,1314.92735 C98.8143654,1314.98519 98.8924918,1315.01772 98.9739889,1315.01772 C99.055486,1315.01772 99.1336124,1314.98519 99.1910293,1314.92735 L103.521972,1310.59641 C103.832136,1310.28625 104.28421,1310.16511 104.707903,1310.27864 Z" id="success"></path>
        </g>
    </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconSuccessModule])],
})
export class IconSuccessModule {
  static icon = 'success';
  static svg = svg;
}
