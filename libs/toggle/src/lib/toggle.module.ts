import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle/toggle.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, NzSwitchModule, FormsModule],
    declarations: [ToggleComponent],
    exports: [ToggleComponent],
})
export class ToggleModule {}
