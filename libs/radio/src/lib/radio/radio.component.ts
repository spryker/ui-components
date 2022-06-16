import {
  AfterViewInit,
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
import { NzRadioComponent } from 'ng-zorro-antd/radio';

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
export class RadioComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit
{
  @Input() value?: string;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() hasError = false;

  @Output() selected = new EventEmitter<string>();

  @ViewChild('contentTpl') template!: TemplateRef<void>;
  @ViewChild(NzRadioComponent, { static: false }) nzRadio?: NzRadioComponent;

  constructor(
    @Optional()
    public radioGroupComponent?: RadioGroupComponent,
  ) {}

  ngOnInit(): void {
    this.radioGroupComponent?.registerRadio(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.radioGroupComponent?.valueChanged(changes.value.previousValue);
      this.updateInputValue();
    }
  }

  ngOnDestroy(): void {
    this.radioGroupComponent?.unregisterRadio(this);
  }

  ngAfterViewInit(): void {
    this.updateInputValue();
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

  private updateInputValue(): void {
    if (!this.nzRadio?.inputElement) {
      return;
    }

    this.nzRadio.inputElement.nativeElement.value = this.value ?? '';
  }
}
