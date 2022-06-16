import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TriggerChangeEventModule } from '@spryker/utils';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioComponent } from './radio/radio.component';

@NgModule({
  imports: [CommonModule, NzRadioModule, FormsModule, TriggerChangeEventModule],
  declarations: [RadioComponent, RadioGroupComponent],
  exports: [RadioComponent, RadioGroupComponent],
})
export class RadioModule {}
