import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ButtonComponent } from './button/button.component';

@NgModule({
    imports: [CommonModule, NzButtonModule],
    exports: [ButtonComponent],
    declarations: [ButtonComponent],
})
export class ButtonModule {
}
