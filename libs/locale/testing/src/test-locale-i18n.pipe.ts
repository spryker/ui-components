import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nLocaleInterpolationData } from '@spryker/locale';
import { Observable, of } from 'rxjs';
import { I18nTestService } from './test-locale-i18n.service';

@Pipe({ standalone: false, name: 'spyI18n' })
export class I18nTestPipe implements PipeTransform {
    private testI18nService = inject(I18nTestService);

    transform(token: string, data?: I18nLocaleInterpolationData): Observable<string> {
        this.testI18nService.addLocaleData(token, data);
        return of(token);
    }
}
