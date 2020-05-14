import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
    <title>Checkbox / Single Unchecked / Enabled</title>
    <defs>
        <rect id="path-1" x="0" y="0" width="18" height="18" rx="4"/>
        <rect id="path-3" x="0" y="0" width="14" height="14" rx="3"/>
    </defs>
    <g id="styleguide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Checkboxes" transform="translate(-109.000000, -1691.000000)">
            <g id="Checkbox-/-Single-Unchecked-/-Enabled" transform="translate(109.000000, 1691.000000)">
                <g id="Helper-/-Container-/-4px-radious">
                    <g id="Helper-/-Container-/-10px-radious">
                        <mask id="mask-2" fill="white">
                            <use xlink:href="#path-1"/>
                        </mask>
                        <use id="Mask" fill="#D8D8D8" xlink:href="#path-1"/>
                    </g>
                </g>
                <g id="Helper-/-Container-/-3px-radious" transform="translate(2.000000, 2.000000)">
                    <g id="Helper-/-Container-/-10px-radious">
                        <mask id="mask-4" fill="white">
                            <use xlink:href="#path-3"/>
                        </mask>
                        <use id="Mask" fill="#FFFFFF" xlink:href="#path-3"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
    </svg>
`;

@NgModule({
  providers: [provideIcons([IconCheckboxUncheckedModule])],
})
export class IconCheckboxUncheckedModule {
  static icon = 'checkbox-unchecked';
  static svg = svg;
}
