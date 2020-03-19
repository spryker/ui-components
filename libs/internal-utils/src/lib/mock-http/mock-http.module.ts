import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MockHttpDirective } from './mock-http.directive';

@NgModule({
  imports: [CommonModule],
  exports: [MockHttpDirective],
  declarations: [MockHttpDirective],
})
export class MockHttpModule {}
