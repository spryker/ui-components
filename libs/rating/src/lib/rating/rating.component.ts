import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { IconStarModule } from '@spryker/icon/icons';

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
    @Input({ transform: booleanAttribute }) allowHalf = true;
    @Input({ transform: booleanAttribute }) readOnly = false;

    @Output() ratingChange = new EventEmitter<number>();

    starIcon = IconStarModule.icon;
}
