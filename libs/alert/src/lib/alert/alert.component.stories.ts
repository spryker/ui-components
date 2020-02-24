import { AlertComponent } from './alert.component';
import { AlertModule } from '../alert.module';
import { ICONS_TOKEN } from '@spryker/icon';

export default {
  title: 'AlertComponent',
};

const errorIcon = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23" version="1.1">
    <defs>
        <path d="M12.2316667,1 C18.4347449,1 23.4633333,6.02858845 23.4633333,12.2316667 C23.4580492,18.4325548 18.4325548,23.4580492 12.2316667,23.4633333 C6.02858845,23.4633333 1,18.4347449 1,12.2316667 C1,6.02858845 6.02858845,1 12.2316667,1 Z M19.3692082,6.90933055 L7.01308815,19.4765293 C8.4799577,20.5377889 10.2827603,21.1633333 12.2316667,21.1633333 C17.1539045,21.1633333 21.1441667,17.1730712 21.1441667,12.2508333 C21.1441667,10.247657 20.4839721,8.3985405 19.3692082,6.90933055 Z M12.2316667,3.32875 L12.2316667,3.33833333 C7.30942883,3.33833333 3.31916667,7.3285955 3.31916667,12.2508333 C3.31916667,14.2439113 3.97338819,16.0841877 5.07879982,17.568631 L17.4357937,5.0097905 C15.9717325,3.95378264 14.1744919,3.33083682 12.2316667,3.32875 Z" id="path-1"/>
    </defs>
    <g id="styleguide" stroke="none" stroke-width="1" fill-rule="evenodd">
        <g id="Icons" transform="translate(-85.000000, -646.000000)">
            <g id="Icon-/-notification-/-error" transform="translate(84.000000, 645.000000)">
                <mask id="mask-2" fill="white">
                    <use xlink:href="#path-1"/>
                </mask>
                <use id="Mask" fill-rule="nonzero" xlink:href="#path-1"/>
                <g id="Colours-/-Red-/-Base" mask="url(#mask-2)" fill-rule="evenodd">
                    <g transform="translate(-0.045455, -0.045455)" id="Colour-/-Red-/-Base">
                        <rect x="0" y="0" />
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
`;

const icons = [
  {
    name: 'error',
    svg: function() {
      return new Promise(resolve => {
        resolve(errorIcon);
      });
    },
  },
];

export const primary = () => ({
  moduleMetadata: {
    imports: [AlertModule],
    providers: [
      {
        provide: ICONS_TOKEN,
        useValue: icons,
      },
    ],
  },
  template: `
    <spy-alert>Some message</spy-alert>
  `,
  props: {},
});
