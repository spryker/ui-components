import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

@Component({
    selector: 'spy-datasource-dependable',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasourceDependableComponent implements AfterContentInit {
    @ContentChild(DatasourceDependableElement) dependableElement!: DatasourceDependableElement;
    @Input() @HostBinding('attr.id') id = '';

    constructor(private datasourceDependableElementsService: DatasourceDependableElementsService) {}

    ngAfterContentInit(): void {
        this.datasourceDependableElementsService.setElement({ [this.id]: this.dependableElement });
    }
}
