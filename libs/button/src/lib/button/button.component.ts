import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'spy-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less', './button.component.styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
