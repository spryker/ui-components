import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { I18nPipe } from './i18n.pipe';

@NgModule({
    imports: [CommonModule],
    exports: [I18nPipe],
    declarations: [I18nPipe],
})
export class I18nModule {}
