import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    Injector,
    OnInit,
    OnDestroy,
    inject,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { ActionConfig, ActionsService } from '@spryker/actions';
import { ButtonAttributes, ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '@spryker/button';
import { Subject } from 'rxjs';
import { switchMap, filter, takeUntil } from 'rxjs/operators';

@Component({
    standalone: false,
    selector: 'spy-button-action',
    templateUrl: './button-action.component.html',
    styleUrls: ['./button-action.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonActionComponent implements OnInit, OnDestroy {
    private injector = inject(Injector);
    private actionsService = inject(ActionsService);

    @Input() @ToJson() action?: ActionConfig;
    @Input() @ToJson() actionContext?: unknown;
    @Input() type?: ButtonType;
    @Input() variant?: ButtonVariant;
    @Input() shape?: ButtonShape;
    @Input() size?: ButtonSize;
    @Input() attrs?: ButtonAttributes;

    triggerAction$ = new Subject<void>();
    destroyed$ = new Subject<void>();

    action$ = this.triggerAction$.pipe(
        filter(() => !!this.action),
        switchMap(() =>
            this.actionsService.trigger(
                this.injector,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.action!,
                this.actionContext,
            ),
        ),
    );

    ngOnInit(): void {
        this.action$.pipe(takeUntil(this.destroyed$)).subscribe();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    onClick(): void {
        this.triggerAction$.next();
    }
}
