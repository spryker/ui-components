import { Injectable, Injector } from '@angular/core';
import { ActionConfig, ActionHandler, ActionsModule } from '@spryker/actions';
import { ButtonShape, ButtonSize, ButtonVariant } from '@spryker/button';
import { select } from '@storybook/addon-knobs';
import { EMPTY, Observable } from 'rxjs';
import { ButtonActionModule } from '../button-action.module';

export default {
    title: 'ButtonActionComponent',
};

@Injectable({
    providedIn: 'root',
})
class MockActionHandlerService implements ActionHandler {
    handleAction(injector: Injector, config: ActionConfig): Observable<void> {
        const action = document.getElementsByClassName('action')[0];

        action.innerHTML = `
      ${config.type}
      ${config.component}
      ${(config.options as Record<string, string>).url}
    `;

        return EMPTY;
    }
}

export const primary = () => ({
    moduleMetadata: {
        imports: [
            ButtonActionModule,
            ActionsModule.withActions({
                mock: MockActionHandlerService,
            }),
        ],
    },
    template: `
    <spy-button-action
      [action]="action"
      [shape]="shape"
      [variant]="variant"
      [size]="size"
    >Show action config</spy-button-action>
    <div class="action"></div>
  `,
    props: {
        action: {
            type: 'mock',
            component: 'component',
            options: {
                url: '/html-request',
            },
        },
        variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
        size: select('Size', ButtonSize, ButtonSize.Large),
        shape: select('Shape', ButtonShape, ButtonShape.Default),
    },
});
