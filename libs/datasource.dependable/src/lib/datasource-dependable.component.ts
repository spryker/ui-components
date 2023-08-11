import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

@Component({
    selector: 'spy-datasource-dependable',
    template: `
        <span [spySelectComponents]="dependableElementRef" (spySelectComponentsFound)="dependableElementsFound($event)">
            <ng-content></ng-content>
        </span>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasourceDependableComponent implements AfterContentInit, OnDestroy {
    @Input() @HostBinding('attr.id') id = '';

    @ContentChild(DatasourceDependableElement)
    set dependableElement(dependableElement: DatasourceDependableElement) {
        this.dependableElement$.next(dependableElement);
    }

    dependableElementRef = DatasourceDependableElement;
    dependableElement$ = new ReplaySubject<DatasourceDependableElement>(1);
    destroyed$ = new Subject<void>();

    constructor(private datasourceDependableElementsService: DatasourceDependableElementsService) {}

    ngAfterContentInit(): void {
        this.dependableElement$.pipe(takeUntil(this.destroyed$)).subscribe((dependableElement) => {
            this.datasourceDependableElementsService.setElement({ [this.id]: dependableElement });
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    dependableElementsFound(dependableElements: DatasourceDependableElement[]): void {
        if (dependableElements) {
            this.dependableElement$.next(dependableElements[0]);
        }
    }
}
