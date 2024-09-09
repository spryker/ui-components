import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IconStarModule } from '@spryker/icon/icons';
import { ToBoolean } from '@spryker/utils';

@Component({
    selector: 'spy-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: { class: 'spy-rating' },
})
export class RatingComponent {
    @Input() rating?: number;
    @Input() maxRating = 5;
    @Input() @ToBoolean() allowHalf = true;
    @Input() @ToBoolean() readOnly = false;

    @Output() ratingChange = new EventEmitter<number>();

    starIcon = IconStarModule.icon;
}
