import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContextPipe } from './lazy-condition-context.pipe';
import { EqualsPipe } from './lazy-condition-equals.pipe';
import { PropPipe } from './lazy-condition-prop.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [EqualsPipe, ContextPipe, PropPipe],
  declarations: [EqualsPipe, ContextPipe, PropPipe],
})
export class LazyConditionModule {}
