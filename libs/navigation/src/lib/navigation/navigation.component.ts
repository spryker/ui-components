import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    forwardRef,
    Input,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import {
    InterceptionComposerDirective,
    InterceptorDispatcherService,
    provideInterceptionComposerToken,
    provideInterceptionService,
} from '@spryker/interception';
import { ToBoolean, ToJson, WindowToken } from '@spryker/utils';
import { NavigationComponentMethods, NavigationItem } from './navigation';
import { NavigationRedirectInterceptionEvent } from './navigation-interception';

@Directive({
    standalone: false,
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'spy-navigation',
    providers: [...provideInterceptionComposerToken(forwardRef(() => NavigationComponent))],
})
export class NavigationComposerDirective extends InterceptionComposerDirective {}

@Component({
    standalone: false,
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
    private windowToken = inject(WindowToken);
    private interceptorDispatcherService = inject(InterceptorDispatcherService);

    @Input() @ToBoolean() collapsed = false;
    @Input() @ToJson() items: NavigationItem[] = [];

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
