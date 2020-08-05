import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
<!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
<title>Search@2x</title>
<desc>Created with Sketch.</desc>
<g stroke="none" stroke-width="1" fill-rule="evenodd">
    <g transform="translate(-191.000000, -1057.000000)" fill="#71747C" fill-rule="nonzero">
        <path d="M210.672425,1075.21202 L205.748543,1070.26345 C208.267184,1067.3643 208.362971,1063.16291 205.978906,1060.15935 C203.594841,1057.15578 199.371457,1056.15701 195.821905,1057.75737 C192.272354,1059.35772 190.350302,1063.12723 191.19948,1066.82282 C192.048657,1070.5184 195.440912,1073.14717 199.357663,1073.14485 C201.071011,1073.14966 202.743512,1072.63944 204.14356,1071.68485 L209.103755,1076.65448 C209.370439,1076.93864 209.77593,1077.0601 210.162141,1076.97152 C210.548352,1076.88294 210.854142,1076.59833 210.960295,1076.22866 C211.066448,1075.85899 210.956158,1075.46277 210.672425,1075.19447 L210.672425,1075.21202 Z M199.357663,1059.10637 C202.766922,1059.10637 205.530672,1061.7776 205.530672,1065.07272 C205.530672,1068.36785 202.766922,1071.03908 199.357663,1071.03908 C195.948405,1071.03908 193.184654,1068.36785 193.184654,1065.07272 C193.184654,1061.7776 195.948405,1059.10637 199.357663,1059.10637 L199.357663,1059.10637 Z" id="Search"/>
    </g>
</g>
</svg>`;

@NgModule({
  providers: [provideIcons([IconMagnifierModule])],
})
export class IconMagnifierModule {
  static icon = 'magnifier';
  static svg = svg;
}
