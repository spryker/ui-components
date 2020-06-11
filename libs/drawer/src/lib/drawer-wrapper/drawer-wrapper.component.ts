import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

/** @internal */
@Component({
  selector: 'spy-drawer-wrapper',
  templateUrl: './drawer-wrapper.component.html',
  styleUrls: ['./drawer-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-drawer-wrapper',
  },
})
export class DrawerWrapperComponent implements OnInit {
  @Input() closeable = true;
  @Input() resizable = true;
  @Input() @HostBinding('style.width') width?: string;

  @Output() closed = new EventEmitter<void>();

  @HostBinding('class.spy-drawer-wrapper--maximized')
  isFullScreen = false;

  private originalWidth?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.originalWidth = this.width;
  }

  close(): void {
    if (this.closeable) {
      this.closed.emit();
    }
  }

  maximize(): void {
    this.isFullScreen = true;
    this.width = '100%';
    this.cdr.markForCheck();
  }

  minimize(): void {
    this.isFullScreen = false;
    this.width = this.originalWidth;
    this.cdr.markForCheck();
  }

  resize(): void {
    if (this.isFullScreen) {
      this.minimize();
    } else {
      this.maximize();
    }
  }
}
