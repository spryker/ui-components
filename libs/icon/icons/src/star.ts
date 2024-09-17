import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2197 9.07491L13.8082 6.93311C14.1743 6.62895 13.9849 6.0333 13.5051 6.00796L10.1718 5.80518C9.96973 5.79251 9.79296 5.66577 9.7172 5.47567L8.49243 2.33268C8.31566 1.88911 7.69696 1.88911 7.52019 2.33268L6.29543 5.463C6.21967 5.6531 6.0429 5.77984 5.84088 5.79251L2.49486 5.99528C2.01506 6.02063 1.82566 6.61628 2.19183 6.92044L4.78025 9.04957C4.93177 9.1763 5.00753 9.39175 4.95702 9.58185L4.11105 12.8389C3.99741 13.2951 4.48984 13.6627 4.89389 13.4092L7.70959 11.5969C7.88636 11.4829 8.10101 11.4829 8.26516 11.5969L11.0935 13.4092C11.4975 13.6627 11.99 13.2951 11.8763 12.8389L11.0304 9.59452C10.9925 9.40442 11.0556 9.20165 11.2197 9.07491Z"/>
</svg>
`;

@NgModule({
    providers: [provideIcons([IconStarModule])],
})
export class IconStarModule {
    static icon = 'star';
    static svg = svg;
}
