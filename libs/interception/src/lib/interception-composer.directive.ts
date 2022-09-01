import { Directive, OnInit } from '@angular/core';

import { InterceptionComposerProviders } from './interception-composable.token';
import { InterceptionComposerImplementation } from './interception-composer.service';

@Directive({
    selector: '[spyInterceptionComposer]',
    providers: [...InterceptionComposerProviders],
})
export class InterceptionComposerDirective implements OnInit {
    constructor(private interceptionComposer: InterceptionComposerImplementation) {}

    ngOnInit(): void {
        this.interceptionComposer.ngOnInit();
    }
}
