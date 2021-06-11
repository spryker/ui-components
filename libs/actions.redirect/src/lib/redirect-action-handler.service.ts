import {
  Injectable,
  Injector,
  Sanitizer,
  SecurityContext,
} from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { UnsavedChangesFormMonitorDirective } from '@spryker/unsaved-changes.monitor.form';
import { AnyContext, ContextService, WindowToken } from '@spryker/utils';
import { Observable, of } from 'rxjs';

import { RedirectActionConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class RedirectActionHandlerService
  implements ActionHandler<unknown, void> {
  handleAction(
    injector: Injector,
    config: RedirectActionConfig,
    context: unknown,
  ): Observable<void> {
    config = { ...config };

    const sanitizer = injector.get(Sanitizer, null);
    const windowToken = injector.get(WindowToken);
    const contextService = injector.get(ContextService, null);
    const unsavedChangesFormMonitorDirective = injector.get(
      UnsavedChangesFormMonitorDirective,
      null,
    );

    unsavedChangesFormMonitorDirective?.reset();

    if (contextService) {
      config.url = contextService.interpolate(
        config.url,
        context as AnyContext,
      );
    }

    if (sanitizer) {
      config.url = String(sanitizer.sanitize(SecurityContext.URL, config.url));
    }

    windowToken.location.href = config.url;

    return of(void 0);
  }
}
