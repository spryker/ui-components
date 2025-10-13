import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: false,
    selector: 'spy-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {}
