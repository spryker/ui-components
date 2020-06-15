import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  IconMaximizeModule,
  IconMinimizeModule,
  IconRemoveModule,
} from '@spryker/icon/icons';

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
export class DrawerWrapperComponent implements OnChanges {
  @Input() closeable = true;
  @Input() resizable = true;
  @Input() @HostBinding('style.width') width?: string;

  @Output() closed = new EventEmitter<void>();

  @HostBinding('class.spy-drawer-wrapper--maximized')
  isFullScreen = false;

  private originalWidth?: string;
  removeIcon = IconRemoveModule.icon;
  maximizeIcon = IconMaximizeModule.icon;
  minimizeIcon = IconMinimizeModule.icon;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('width' in changes && this.isFullScreen) {
      // Reset fullscreen state to recalculate width
      this.isFullScreen = false;
      this.maximize();
    }
  }

  close(): void {
    if (this.closeable) {
      this.closed.emit();
    }
  }

  maximize(): void {
    if (this.isFullScreen) {
      return;
    }

    this.isFullScreen = true;
    this.originalWidth = this.width;
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
