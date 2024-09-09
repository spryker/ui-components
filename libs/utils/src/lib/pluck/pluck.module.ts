import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluckPipe } from './pluck.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [PluckPipe],
    exports: [PluckPipe],
})
export class PluckModule {}
