import { Injectable } from '@angular/core';
import { ActionsModule } from '@spryker/actions';
import { ButtonShape, ButtonSize, ButtonVariant } from '@spryker/button';
import { select } from '@storybook/addon-knobs';
import { ButtonActionModule } from '../button-action.module';

export default {
  title: 'ButtonActionComponent'
}

@Injectable({
  providedIn: 'root',
})
class MockActionService {
  handleAction(injector: any, config: any, context: any): void {
    const action = document.getElementsByClassName('action')[0];

    action.innerHTML = `
      ${config.type}
      ${config.component}
      ${config.options.inputs.url}
    `;
  }
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ButtonActionModule,
      ActionsModule.withActions({
        mock: MockActionService,
      })
    ],
  },
  template: `
    <spy-button-action
      [action]="action"
      [shape]="shape"
      [variant]="variant"
      [size]="size"
    >Show notification</spy-button-action>
    <div class="action"></div>
  `,
  props: {
    action: {
      type: 'mock',
      component: 'component',
      options: {
        inputs: {
          url: '/html-request'
        }
      }
    },
    variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
    size: select('Size', ButtonSize, ButtonSize.Large),
    shape: select('Shape', ButtonShape, ButtonShape.Default),
  }
})
