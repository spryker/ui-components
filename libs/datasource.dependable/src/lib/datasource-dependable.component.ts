import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

@Component({
    standalone: false,
    selector: 'spy-datasource-dependable',
    templateUrl: './datasource-dependable.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasourceDependableComponent {
    private datasourceDependableElementsService = inject(DatasourceDependableElementsService);

    @Input() @HostBinding('attr.id') id = '';

    @ContentChild(DatasourceDependableElement)
    set dependableElement(dependableElement: DatasourceDependableElement) {
        this.setDependableElement(dependableElement);
    }

    dependableElementRef = DatasourceDependableElement;

    dependableElementsFound(dependableElements: DatasourceDependableElement[]): void {
        if (dependableElements.length) {
            this.setDependableElement(dependableElements[0]);
        }
    }

    private setDependableElement(dependableElement: DatasourceDependableElement): void {
        this.datasourceDependableElementsService.setElement({ [this.id]: dependableElement });
    }
}
