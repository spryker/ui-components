import { provideAnimations } from '@angular/platform-browser/animations';
import { Icon, provideIcons } from '@spryker/icon';
import { SidebarModule } from '@spryker/sidebar';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { NavigationModule } from '../navigation.module';
import { NavigationComponent } from './navigation.component';

const iconDashboard = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="styleguide" stroke="none" stroke-width="1" fill-rule="evenodd">
      <g id="Icons" transform="translate(-87.000000, -924.000000)">
        <path d="M94.2727273,924 C95.2768814,924 96.0909091,924.814028 96.0909091,925.818182 L96.0909091,942.181818 C96.0909091,943.185972 95.2768814,944 94.2727273,944 L88.8181818,944 C87.8140277,944 87,943.185972 87,942.181818 L87,925.818182 C87,924.814028 87.8140277,924 88.8181818,924 L94.2727273,924 Z M105.181818,934 C106.185972,934 107,934.814028 107,935.818182 L107,942.181818 C107,943.185972 106.185972,944 105.181818,944 L99.7272727,944 C98.7231186,944 97.9090909,943.185972 97.9090909,942.181818 L97.9090909,935.818182 C97.9090909,934.814028 98.7231186,934 99.7272727,934 L105.181818,934 Z M105.181818,924 C106.185972,924 107,924.814028 107,925.818182 L107,930.363636 C107,931.36779 106.185972,932.181818 105.181818,932.181818 L99.7272727,932.181818 C98.7231186,932.181818 97.9090909,931.36779 97.9090909,930.363636 L97.9090909,925.818182 C97.9090909,924.814028 98.7231186,924 99.7272727,924 L105.181818,924 Z" id="Dashboard"/>
      </g>
    </g>
  </svg>
`;

const iconOrders = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 21 21" version="1.1" width="24px" height="24px">
    <defs>
      <path d="M21.7681676,7.84747898 C21.9534216,8.07923928 22.0228162,8.35735164 21.9765784,8.68181606 L21.0966216,13.7342285 C21.0657459,13.9969659 20.9460649,14.2131998 20.7376919,14.3831573 C20.5292811,14.5531149 20.2938919,14.6380936 20.0314108,14.6380936 L7.20256757,14.6380936 L6.94784324,16.0750075 L19.1746486,16.0750075 C19.4679676,16.0750075 19.7225405,16.1792996 19.9387838,16.3878839 C20.1549514,16.5964682 20.2629027,16.8552672 20.2629027,17.1642809 C20.2629027,17.4732946 20.1549135,17.7320936 19.9387838,17.9406779 C19.7225405,18.1492622 19.4679676,18.2535543 19.1746486,18.2535543 L5.65106486,18.2535543 C5.32687027,18.2535543 5.04898919,18.1222235 4.81742162,17.8596754 C4.60129189,17.596938 4.51638378,17.2956117 4.5626973,16.9558102 L5.14161622,13.8038702 L4.26165946,4.95055098 L1.76072973,4.16256596 C1.46741081,4.06986184 1.25514054,3.89214107 1.12391892,3.62951727 C0.992697297,3.36681773 0.965681081,3.08874324 1.04287027,2.79518019 C1.1354973,2.50161715 1.31689189,2.2891702 1.58705405,2.15783937 C1.85721622,2.02650853 2.13123784,1.99946983 2.40911892,2.07672326 L5.60475135,3.09646858 C5.80544324,3.15827133 5.9714,3.27415148 6.10262162,3.44410903 C6.23384324,3.61406658 6.31489189,3.80723804 6.34576757,4.02354765 L6.53102162,5.78492593 L21.0271514,7.40724802 C21.3513459,7.45348648 21.5983514,7.600268 21.7681676,7.84747898 Z M7.29523243,18.8561311 C7.75836757,18.8561311 8.15203243,19.0183633 8.47622703,19.3429035 C8.80042162,19.6672543 8.96251892,20.0613604 8.96251892,20.524881 C8.96251892,20.988288 8.80042162,21.3862568 8.47622703,21.7184465 C8.15203243,22.0506363 7.75836757,22.2167312 7.29523243,22.2167312 C6.8320973,22.2167312 6.43843243,22.0506363 6.11423784,21.7184465 C5.79004324,21.3862946 5.62794595,20.9884016 5.62794595,20.524881 C5.62794595,20.0613604 5.79004324,19.6672921 6.11423784,19.3429035 C6.43839459,19.0183633 6.83205946,18.8561311 7.29523243,18.8561311 Z M17.1831297,18.8561311 C17.6461892,18.8561311 18.0399676,19.0183633 18.3641622,19.3429035 C18.6882054,19.6672543 18.8504541,20.0613604 18.8504541,20.524881 C18.8504541,20.988288 18.6883189,21.3862568 18.3641622,21.7184465 C18.0399676,22.0506363 17.6461892,22.2167312 17.1831297,22.2167312 C16.7199946,22.2167312 16.3262541,22.0506363 16.002173,21.7184465 C15.6779784,21.3862946 15.5157676,20.9884016 15.5157676,20.524881 C15.5157676,20.0613604 15.6779027,19.6672921 16.002173,19.3429035 C16.3263297,19.0183633 16.7199946,18.8561311 17.1831297,18.8561311 Z" id="path-1234"/>
    </defs>
    <g id="Icon-/-navigation-/-orders" transform="translate(-1.000000, -2.000000)">
      <use id="Orders-icon" fill="currentColor" fill-rule="nonzero" xlink:href="#path-1234"/>
    </g>
  </svg>
`;

const iconOffers = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <defs>
      <path d="M2.61494505,9.06286685 L10.4835714,11.8787225 C10.9588312,12.0485662 11.2750175,12.4920274 11.2747284,12.9883404 L11.2747284,20.5546179 C11.2756173,20.9402995 11.0843996,21.3020757 10.7626015,21.5235355 C10.4408034,21.7449954 10.02903,21.7981946 9.65978022,21.666015 L1.79054945,18.8501594 C1.31573613,18.6801928 0.999869331,18.2370781 0.999999959,17.7411346 L0.999999959,10.1718917 C0.999999959,9.78662901 1.19144192,9.42556936 1.51311596,9.20466742 C1.83479,8.98376547 2.2460969,8.93083208 2.61494505,9.06286685 Z M21.3850549,9.06286685 C21.7539031,8.93083208 22.16521,8.98376547 22.486884,9.20466742 C22.8085581,9.42556936 23,9.78662901 23,10.1718917 L23,10.1718917 L23,17.7411346 C23,18.2372302 22.6838977,18.68039 22.2088462,18.8501594 L22.2088462,18.8501594 L14.3402198,21.666015 C13.97097,21.7981946 13.5591966,21.7449954 13.2373985,21.5235355 C12.9156004,21.3020757 12.7243827,20.9402995 12.7252716,20.5546179 L12.7252716,20.5546179 L12.7252716,12.9883404 C12.7251441,12.4923968 13.0410109,12.0492821 13.5158242,11.8793155 L13.5158242,11.8793155 Z M11.1423626,3.15182372 C11.6983882,2.9569743 12.3047618,2.94966982 12.8654945,3.13106657 L12.8654945,3.13106657 L21.7821429,6.07502344 C21.9697154,6.13576314 22.0988112,6.30480349 22.1055578,6.49850872 C22.1123045,6.69221395 21.9952713,6.86950834 21.8123626,6.94267229 L21.8123626,6.94267229 L13.0655495,10.4322457 C12.3805533,10.7054887 11.6155806,10.7143869 10.9241758,10.4571542 L10.9241758,10.4571542 L2.19730769,7.21073605 C2.01252885,7.14205692 1.89100336,6.96759527 1.89287108,6.77371892 C1.89478224,6.57984256 2.01968567,6.40769328 2.20576923,6.34249414 L2.20576923,6.34249414 Z" id="path-1"/>
    </defs>
    <g id="Icon-/-navigation-/-products-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <use id="Offers-icon" fill="currentColor" fill-rule="nonzero" xlink:href="#path-1"/>
    </g>
  </svg>
`;

const iconProfile = `
  <svg viewBox="0 0 22 20">
    <defs>
      <path d="M12.314 20.03a1.744 1.744 0 01-1.71 1.757H4.018a1.726 1.726 0 01-1.245-.506 1.76 1.76 0 01-.515-1.252v-6.613A1.397 1.397 0 011 12.026v-.139c0-.113.012-.226.038-.336l1.03-4.214a1.392 1.392 0 011.346-1.066h17.015c.646 0 1.206.45 1.352 1.085l.949 4.163c.024.104.037.21.037.318v.196a1.396 1.396 0 01-1.389 1.39h-.302v6.77a1.6 1.6 0 01-3.199 0v-6.77h-5.563zm-3.771-5.833H6.079c-.694 0-1.257.569-1.257 1.27v2.48c0 .702.563 1.27 1.257 1.27h2.464c.694 0 1.257-.568 1.257-1.27v-2.48c0-.701-.563-1.27-1.257-1.27zM19.892 2a1.6 1.6 0 011.6 1.6v.03a1.6 1.6 0 01-1.6 1.6H3.882a1.6 1.6 0 01-1.6-1.6V3.6a1.6 1.6 0 011.6-1.6h16.01z" id="a"/>
    </defs>
    <g transform="translate(-1 -2)" fill="none" fill-rule="evenodd">
      <mask id="b" fill="#fff">
        <use xlink:href="#a"/>
      </mask>
      <use fill="currentColor" xlink:href="#a"/>
      <g mask="url(#b)" fill="currentColor">
        <path d="M0 0h24v24H0z"/>
      </g>
    </g>
  </svg>
`;

const icons: Icon[] = [
    { icon: 'dashboard', svg: iconDashboard },
    { icon: 'orders', svg: iconOrders },
    { icon: 'offers', svg: iconOffers },
    { icon: 'profile', svg: iconProfile },
];

export default {
    title: 'NavigationComponent',
    component: NavigationComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), provideIcons(icons)],
        }),
        moduleMetadata({
            imports: [NavigationModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['collapsed', 'items'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=319%3A448',
            allowFullscreen: true,
        },
    },
    args: {
        collapsed: false,
        items: [
            {
                title: 'Item1',
                url: '/dashboard',
                icon: 'dashboard',
                isDisabled: true,
            },
            {
                title: 'Item2',
                icon: 'orders',
                isActive: false,
                subItems: [
                    {
                        title: 'SubItem1',
                        url: '',
                        icon: '',
                        isActive: false,
                        subItems: [],
                    },
                    {
                        title: 'SubItem2',
                    },
                    {
                        title: 'SubItem3',
                        url: '',
                        icon: '',
                        isActive: false,
                        isDisabled: true,
                        subItems: [],
                    },
                    {
                        title: 'SubItem4',
                        url: '',
                        icon: '',
                        isActive: false,
                        subItems: [],
                    },
                ],
            },
            {
                title: 'Item3',
                url: '/offers',
                icon: 'offers',
                isActive: true,
                subItems: [],
            },
            {
                title: 'Item4',
                url: '/profile',
                icon: 'profile',
                isActive: false,
                subItems: [],
            },
        ],
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withSidebar = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [SidebarModule],
    },
    template: `
    <spy-sidebar [collapsed]="collapsed" (collapsedChange)="collapsed = $event">
      <spy-navigation [items]="items" [collapsed]="collapsed"></spy-navigation>
    </spy-sidebar>
  `,
});
withSidebar.args = {
    items: [
        {
            title: 'Item1',
            icon: 'dashboard',
            isDisabled: true,
        },
        {
            title: 'Item2',
            url: '',
            icon: 'orders',
            isActive: false,
            subItems: [
                {
                    title: 'SubItem1',
                    url: '',
                    icon: '',
                    isActive: true,
                    subItems: [],
                },
                {
                    title: 'SubItem2',
                    url: '',
                    subItems: [
                        {
                            title: 'SubSubItem1',
                        },
                        {
                            title: 'SubSubItem2',
                        },
                        {
                            title: 'SubSubItem3',
                        },
                    ],
                },
                {
                    title: 'SubItem3',
                    url: '',
                    icon: '',
                    isActive: false,
                    isDisabled: true,
                    subItems: [],
                },
                {
                    title: 'SubItem4',
                    url: '',
                    icon: '',
                    isActive: false,
                    subItems: [],
                },
            ],
        },
        {
            title: 'Item3',
            url: '',
            icon: 'offers',
            isActive: true,
            subItems: [],
        },
        {
            title: 'Item4',
            url: '',
            icon: 'profile',
            isActive: false,
            subItems: [],
        },
    ],
};
withSidebar.argTypes = {
    collapsed: {
        table: {
            disable: true,
        },
    },
};
