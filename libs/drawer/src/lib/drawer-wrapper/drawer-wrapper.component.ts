import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  HostBinding,
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
export class DrawerWrapperComponent {
  @Input() closeable = true;
  @Input() resizable = true;
  @Input() @HostBinding('style.width') width?: string;

  @Output() closed = new EventEmitter<void>();

  @HostBinding('class.spy-drawer-wrapper--maximized')
  isFullScreen = false;

  private originalWidth?: string;

  close(): void {
    if (this.closeable) {
      this.closed.emit();
    }
  }

  maximize(): void {
    this.isFullScreen = true;
    this.originalWidth = this.width;
    this.width = '100%';
  }

  minimize(): void {
    this.isFullScreen = false;
    this.width = this.originalWidth;
  }

  resize(): void {
    if (this.isFullScreen) {
      this.minimize();
    } else {
      this.maximize();
    }
  }
}
