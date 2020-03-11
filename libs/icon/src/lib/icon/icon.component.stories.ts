import * as icons from '@spryker/icon/icons';
import { optionsKnob, text } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconComponent } from './icon.component';
import { Icon } from './icon.component.service';

export default {
  title: 'IconComponent',
};

const iconsModules = Object.keys(icons).map(
  name => (icons as any)[name] as Icon,
);

const iconNames = iconsModules.map(i => i.icon);

export const allIcons = (): IStory => ({
  moduleMetadata: {
    imports: [NzIconModule, ...iconsModules],
    declarations: [IconComponent],
  },
  template: `
    <p *ngFor="let icon of icons">
      <spy-icon [name]="icon" [style.color]="color"></spy-icon>
      ({{ icon }})
    </p>
  `,
  props: {
    icons: iconNames,
    color: text('Icon color', ''),
  },
});

export const icon = (): IStory => ({
  moduleMetadata: {
    imports: [NzIconModule, ...iconsModules],
  },
  component: IconComponent,
  props: {
    name: optionsKnob(
      'Icon name',
      iconNames.reduce((acc, name) => ({ ...acc, [name]: name }), {}),
      iconNames[0],
      { display: 'select' },
    ),
  },
});
