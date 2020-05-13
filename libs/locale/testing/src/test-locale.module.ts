import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestLocaleRenderDirective } from './test-locale-render.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TestLocaleRenderDirective],
  exports: [TestLocaleRenderDirective],
})
export class TestLocaleModule {}
