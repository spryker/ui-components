import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="21px" height="14px" viewBox="0 0 21 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
    <title>dropdown arrow@2x</title>
    <desc>Created with Sketch.</desc>
    <g id="styleguide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icons" transform="translate(-774.000000, -1060.000000)" fill="currentColor">
            <g id="dropdown-arrow" transform="translate(773.000000, 1059.000000)">
                <path d="M2.6210044,5.28196943 L13.3429208,5.47781153 C14.7724925,5.5039235 15.9251143,6.65654531 15.9512263,8.08611706 L15.9523128,8.14560357 C15.9778045,9.54121253 14.8671049,10.6932422 13.4714959,10.7187338 C13.4407274,10.7192958 13.4099512,10.7192958 13.3791826,10.7187338 L2.65726627,10.5228917 C1.22769452,10.4967797 0.0750727104,9.3441579 0.048960742,7.91458615 L0.0478741861,7.85509964 C0.0223825681,6.45949068 1.13308213,5.30746104 2.52869109,5.28196943 C2.55945963,5.28140742 2.59023587,5.28140742 2.6210044,5.28196943 Z" id="Rectangle-Copy" transform="translate(8.000094, 8.000352) rotate(-135.000000) translate(-8.000094, -8.000352) "></path>
                <path d="M15.2584826,0.0478741861 L15.3179691,0.048960742 C16.7475408,0.0750727104 17.9001627,1.22769452 17.9262746,2.65726627 L18.1221167,13.3791826 C18.1476083,14.7747916 17.0369088,15.9268212 15.6412998,15.9523128 C15.6105313,15.9528748 15.5797551,15.9528748 15.5489865,15.9523128 L15.4895,15.9512263 C14.0599283,15.9251143 12.9073064,14.7724925 12.8811945,13.3429208 L12.6853524,2.6210044 C12.6598608,1.22539544 13.7705603,0.0733658041 15.1661693,0.0478741861 C15.1969378,0.0473121806 15.2277141,0.0473121806 15.2584826,0.0478741861 Z" id="Rectangle-Copy-2" transform="translate(15.403735, 8.000094) rotate(-135.000000) translate(-15.403735, -8.000094) "></path>
            </g>
        </g>
    </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconArrowDownModule])],
})
export class IconArrowDownModule {
  static icon = 'arrow-down';
  static svg = svg;
}
