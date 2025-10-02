import { Component, importProvidersFrom, Injectable, Injector, NgModule, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { Observable, of } from 'rxjs';
import { ActionConfig, ActionHandler, ActionsModule } from '@spryker/actions';
import { AjaxActionService } from './ajax-action.service';

@Injectable({
    providedIn: 'root',
})
class ActionMockService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, action: ActionConfig): Observable<void> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('test-id')!.innerHTML += `<div>${action.random}</div>`;

        return of(void 0);
    }
}

@Component({
    standalone: false,
    selector: 'spy-story',
    template: `
        <button (click)="clickHandler()">Click to show random number</button>
        <div id="test-id"></div>
    `,
    providers: [AjaxActionService],
})
class StoryComponent {
    protected injector = inject(Injector);
    protected ajaxActionService = inject(AjaxActionService);

    clickHandler() {
        const random = Math.random().toFixed(4);

        const actionObject = {
            actions: [
                {
                    type: 'mock',
                    random,
                },
            ],
        };

        this.ajaxActionService.handle(actionObject, this.injector);
    }
}

@NgModule({
    exports: [StoryComponent],
    declarations: [StoryComponent],
})
class StoryModule {}

export default {
    title: 'AjaxActionComponent',
    component: StoryComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        mock: ActionMockService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [StoryModule],
        }),
    ],
} as Meta;

export const primary = (args) => ({
    props: args,
});
