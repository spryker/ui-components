import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectedCdkScrollableDirective } from './redirected-cdk-scrollable.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [RedirectedCdkScrollableDirective],
    exports: [RedirectedCdkScrollableDirective],
})
export class RedirectedCdkScrollableModule {}
