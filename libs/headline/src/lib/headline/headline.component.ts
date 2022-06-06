import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';

export enum Level {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    Base = 'base',
}

@Component({
    selector: 'spy-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-headline',
    },
})
export class HeadlineComponent {
    @Input() level: Level = Level.H1;
}
