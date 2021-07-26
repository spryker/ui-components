import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestLocaleRenderDirective } from './test-locale-render.directive';
import { I18nTestPipe } from './test-locale-i18n.pipe';
import { I18nService } from '@spryker/locale';
import { I18nTestService } from './test-locale-i18n.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TestLocaleRenderDirective, I18nTestPipe],
  exports: [TestLocaleRenderDirective, I18nTestPipe],
  providers: [{ provide: I18nService, useExisting: I18nTestService }],
})
export class TestLocaleModule {}
