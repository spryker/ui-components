import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<svg viewBox="0 0 24 24" version="1.1">
    <defs>
        <path d="M20.0297017,3.97141328 C18.7339189,2.67619557 16.6352152,2.67619557 15.3394324,3.97141328 L15.3394324,3.97141328 L4.19067706,15.1704854 C4.07647472,15.2855905 3.99834996,15.431591 3.96590376,15.5905443 L3.02185594,19.9861614 C2.96249728,20.2390978 3.02560776,20.5052511 3.19218654,20.7044898 C3.35876532,20.9037286 3.60935209,21.012777 3.868502,20.9988035 L4.03333575,20.9988035 L8.46136961,20.0836751 C8.61942017,20.0492153 8.7647291,19.9712817 8.88094643,19.8586435 L20.0297017,8.66707244 C21.3234328,7.36980055 21.3234328,5.26868517 20.0297017,3.97141328 Z" id="path-edit-icon"/>
    </defs>
    <g id="icons" stroke="none" stroke-width="1" fill-rule="evenodd">
        <g>
            <mask id="mask-edit-icon">
              <use xlink:href="#path-edit-icon"/>
            </mask>
            <use id="Mask" fill-rule="nonzero" xlink:href="#path-edit-icon"/>
            <g mask="url(#mask-edit-icon)">
                <g transform="translate(0.000000, -1.000000)">
                    <rect x="0" y="0" width="24" height="24"/>
                </g>
            </g>
        </g>
    </g>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconEditModule])],
})
export class IconEditModule {
  static icon = 'edit';
  static svg = svg;
}
