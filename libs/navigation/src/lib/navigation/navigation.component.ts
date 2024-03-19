import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    forwardRef,
    Inject,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {
    InterceptionComposerDirective,
    InterceptorDispatcherService,
    provideInterceptionComposerToken,
    provideInterceptionService,
} from '@spryker/interception';
import { InjectionTokenType, ToBoolean, ToJson, WindowToken } from '@spryker/utils';

import { NavigationComponentMethods, NavigationItem } from './navigation';
import { NavigationRedirectInterceptionEvent } from './navigation-interception';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'spy-navigation',
    providers: [...provideInterceptionComposerToken(forwardRef(() => NavigationComponent))],
})
export class NavigationComposerDirective extends InterceptionComposerDirective {}

@Component({
    selector: 'spy-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [...provideInterceptionService()],
    host: {
        class: 'spy-navigation',
    },
})
export class NavigationComponent implements NavigationComponentMethods {
    @Input() @ToBoolean() collapsed = false;
    @Input() @ToJson() items: NavigationItem[] = [];

    constructor(
        @Inject(WindowToken)
        private windowToken: InjectionTokenType<typeof WindowToken>,
        private interceptorDispatcherService: InterceptorDispatcherService,
    ) {}

    clickHandler(event: Event, url: string): void {
        event.stopPropagation();
        event.preventDefault();

        this.interceptorDispatcherService.dispatchToAll(NavigationRedirectInterceptionEvent).subscribe(() => {
            this.windowToken.location.href = url;
        });
    }

    collapse(): void {
        this.collapsed = true;
    }

    expand(): void {
        this.collapsed = false;
    }

    toggle(): boolean {
        if (this.collapsed) {
            this.expand();
        } else {
            this.collapse();
        }

        return this.isCollapsed();
    }

    isCollapsed(): boolean {
        return this.collapsed;
    }
}
