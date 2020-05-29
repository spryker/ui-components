import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestLocaleRenderDirective } from './test-locale-render.directive';
import { I18nTestPipe } from './test-locale-i18n.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TestLocaleRenderDirective, I18nTestPipe],
  exports: [TestLocaleRenderDirective, I18nTestPipe],
})
export class TestLocaleModule {}
