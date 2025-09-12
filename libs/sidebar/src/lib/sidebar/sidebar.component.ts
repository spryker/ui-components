import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { IconArrowDownModule } from '@spryker/icon/icons';
import { PersistenceService } from '@spryker/persistence';
import { ToBoolean } from '@spryker/utils';
import { merge, ReplaySubject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    standalone: false,
    selector: 'spy-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-sidebar',
    },
})
export class SidebarComponent implements OnChanges, OnInit {
    private persistenceService = inject(PersistenceService);

    @Input() width = 250;
    @Input() collapsedWidth = 96;
    @Input() spyId?: string;
    @Input() trigger: undefined | TemplateRef<void>;
    @Input() @ToBoolean() collapsed = false;
    @Output() collapsedChange = new EventEmitter<boolean>();

    private isCollapsedStateRetrieved = false;
    arrowIcon = IconArrowDownModule.icon;

    setCollapsedState$ = new ReplaySubject<boolean>();
    spyId$ = new ReplaySubject<string>();
    persistenceKey$ = this.spyId$.pipe(map((spyId) => `spy-sidebar-${spyId ?? ''}-is-collapsed`));
    initialState$ = this.persistenceKey$.pipe(
        switchMap((persistenceKey) => {
            return this.persistenceService.retrieve<boolean>(persistenceKey);
        }),
        tap((isCollapsed) => this.updateCollapse(isCollapsed ?? this.collapsed, true)),
    );

    collapsed$ = merge(this.initialState$, this.setCollapsedState$).pipe(
        withLatestFrom(this.persistenceKey$),
        tap(([isCollapsed, persistenceKey]) => {
            if (this.isCollapsedStateRetrieved) {
                return;
            }

            this.persistenceService.save(persistenceKey, isCollapsed);
        }),
        map(([isCollapsed]) => isCollapsed),
    );

    ngOnInit(): void {
        this.spyId$.next(this.spyId);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.collapsed) {
            this.updateCollapse(this.collapsed, changes.collapsed.firstChange);
        }

        if (changes.spyId && !changes.spyId.firstChange) {
            this.spyId$.next(this.spyId);
        }
    }

    updateCollapse(isCollapsed: boolean, isStateRetrieved = false): void {
        this.isCollapsedStateRetrieved = isStateRetrieved;
        this.setCollapsedState(isCollapsed);
        this.collapsedChange.emit(this.isCollapsed());
    }

    collapse(): void {
        this.setCollapsedState(true);
    }

    expand(): void {
        this.setCollapsedState(false);
    }

    toggle(): boolean {
        if (this.collapsed) {
            this.expand();
        } else {
            this.collapse();
        }

        return this.isCollapsed();
    }

    isCollapsed(): boolean {
        return this.collapsed;
    }

    protected setCollapsedState(isCollapsed: boolean): void {
        this.collapsed = isCollapsed;
        this.setCollapsedState$.next(this.collapsed);
    }
}
