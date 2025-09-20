import { Directive, OnInit, inject } from '@angular/core';

import { InterceptionComposerProviders } from './interception-composable.token';
import { InterceptionComposerImplementation } from './interception-composer.service';

@Directive({ standalone: false, selector: '[spyInterceptionComposer]', providers: [...InterceptionComposerProviders] })
export class InterceptionComposerDirective implements OnInit {
    private interceptionComposer = inject(InterceptionComposerImplementation);

    ngOnInit(): void {
        this.interceptionComposer.ngOnInit();
    }
}
