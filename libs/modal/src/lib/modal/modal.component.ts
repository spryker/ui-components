import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Type,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'spy-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @Input() visible?: boolean;
  @Input() data?: unknown;
  @Input() component?: Type<any>;

  @Output() visibleChange = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  open(forceReopen?: boolean): void {}
}
