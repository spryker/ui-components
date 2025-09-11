import { Directive, OnInit } from '@angular/core';

import { InterceptionComposerProviders } from './interception-composable.token';
import { InterceptionComposerImplementation } from './interception-composer.service';

@Directive({ standalone: false, selector: '[spyInterceptionComposer]', providers: [...InterceptionComposerProviders] })
export class InterceptionComposerDirective implements OnInit {
    constructor(private interceptionComposer: InterceptionComposerImplementation) {}

    ngOnInit(): void {
        this.interceptionComposer.ngOnInit();
    }
}
