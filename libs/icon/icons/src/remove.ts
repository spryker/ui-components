import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-84.000000, -1058.000000)">
            <path d="M88.1670564,1058.71495 L93,1063.547 L97.8329436,1058.71495 C98.7862154,1057.76168 100.331774,1057.76168 101.285046,1058.71495 C102.238318,1059.66823 102.238318,1061.21378 101.285046,1062.16706 L96.453,1067 L101.285046,1071.83294 C102.238318,1072.78622 102.238318,1074.33177 101.285046,1075.28505 C100.331774,1076.23832 98.7862154,1076.23832 97.8329436,1075.28505 L93,1070.453 L88.1670564,1075.28505 C87.2137846,1076.23832 85.6682257,1076.23832 84.7149539,1075.28505 C83.761682,1074.33177 83.761682,1072.78622 84.7149539,1071.83294 L89.547,1067 L84.7149539,1062.16706 C83.761682,1061.21378 83.761682,1059.66823 84.7149539,1058.71495 C85.6682257,1057.76168 87.2137846,1057.76168 88.1670564,1058.71495 Z" id="Remove"></path>
        </g>
    </g>
</svg>
`;

@NgModule({
    providers: [provideIcons([IconRemoveModule])],
})
export class IconRemoveModule {
    static icon = 'remove';
    static svg = svg;
}
