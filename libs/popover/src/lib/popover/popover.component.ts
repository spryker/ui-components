import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NzPopoverComponent } from 'ng-zorro-antd/popover';

export enum PopoverPosition {
  TopLeft = 'topLeft',
  Top = 'top',
  TopRight = 'topRight',

  RightTop = 'rightTop',
  Right = 'right',
  RightBottom = 'rightBottom',

  BottomLeft = 'bottomLeft',
  Bottom = 'bottom',
  BottomRight = 'bottomRight',

  LeftTop = 'leftTop',
  Left = 'left',
  LeftBottom = 'leftBottom',
}

@Component({
  selector: 'spy-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spy-popover',
  },
})
export class PopoverComponent implements OnInit {
  @Input() open?: boolean;
  @Input() position?: PopoverPosition = PopoverPosition.Bottom;
  @Output() openChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  openChangeEvent(isOpen: boolean): void {
    this.open = isOpen;
    this.openChange.emit(isOpen);
  }
}
