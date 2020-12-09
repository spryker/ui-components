import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

import { RadioGroupComponent } from '../radio-group/radio-group.component';

@Component({
  selector: 'spy-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-radio',
    '[class.spy-radio--disabled]': 'disabled',
    '[class.spy-radio--error]': 'hasError',
  },
})
export class RadioComponent implements OnInit, OnChanges, OnDestroy {
  @Input() value?: string;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() hasError = false;

  @Output() selected = new EventEmitter<string>();

  @ViewChild('contentTpl') template!: TemplateRef<void>;

  constructor(
    @Optional()
    public radioGroupComponent: RadioGroupComponent,
  ) {}

  ngOnInit(): void {
    this.registerRadio();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes) {
      this.registerRadio();
    }
  }

  ngOnDestroy() {
    this.unregisterRadio();
  }

  select() {
    if (this.radioGroupComponent) {
      this.radioGroupComponent.select(this);
    }
  }

  reset() {
    if (this.radioGroupComponent) {
      this.radioGroupComponent.reset();
    }
  }

  private registerRadio() {
    if (!this.radioGroupComponent) {
      return;
    }

    const radios = this.radioGroupComponent.addRadio$.getValue();
    const isRadioExist = radios.has(this);

    if (isRadioExist) {
      radios.delete(this);
    }

    radios.add(this);
    this.radioGroupComponent.addRadio$.next(radios);
  }

  private unregisterRadio() {
    if (!this.radioGroupComponent) {
      return;
    }

    const radios = this.radioGroupComponent.addRadio$.getValue();
    const isRadioExist = radios.has(this);

    if (!isRadioExist) {
      return;
    }

    radios.delete(this);
    this.radioGroupComponent.addRadio$.next(radios);
  }
}
