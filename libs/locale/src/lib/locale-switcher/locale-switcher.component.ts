import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { TypedSimpleChanges } from '@spryker/utils';

import { LocaleService } from '../locale.service';

export class LocaleSwitcherInputs {
  @Input() locale?: string;
}

@Component({
  selector: 'spy-locale-switcher',
  templateUrl: './locale-switcher.component.html',
  styleUrls: ['./locale-switcher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: none' },
})
export class LocaleSwitcherComponent
  extends LocaleSwitcherInputs
  implements OnChanges {
  constructor(private localeService: LocaleService) {
    super();
  }

  ngOnChanges(changes: TypedSimpleChanges<LocaleSwitcherInputs>): void {
    if (changes.locale && this.locale) {
      this.localeService.setLocale(this.locale);
    }
  }
}
