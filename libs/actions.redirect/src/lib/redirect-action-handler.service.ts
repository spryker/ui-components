import { Injectable, Injector, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionHandler } from '@spryker/actions';
import { UnsavedChangesMonitorToken } from '@spryker/unsaved-changes';
import { AnyContext, ContextService, WindowToken } from '@spryker/utils';
import { Observable, of } from 'rxjs';

import { RedirectActionConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class RedirectActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, config: RedirectActionConfig, context: unknown): Observable<void> {
        const sanitizer = injector.get(DomSanitizer);
        const windowToken = injector.get(WindowToken);
        const contextService = injector.get(ContextService);
        const monitor = injector.get(UnsavedChangesMonitorToken, null);

        monitor?.reset();

        let url = config.url;

        url = contextService.interpolate(url, context as AnyContext);

        url = String(sanitizer.sanitize(SecurityContext.URL, url));

        windowToken.location.href = url;

        return of(void 0);
    }
}
