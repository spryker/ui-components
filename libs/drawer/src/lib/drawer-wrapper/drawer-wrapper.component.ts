import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'spy-drawer-wrapper',
  templateUrl: './drawer-wrapper.component.html',
  styleUrls: ['./drawer-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerWrapperComponent {
  @Input() closeable = true;
  @Input() resizable = true;
  @Input() @HostBinding('style.width') width?: string;

  @Output() closed = new EventEmitter();

  @HostBinding('class.spy-drawer__full-screen')
  isFullScreen = false;

  private originalWidth?: string;

  close() {
    if (this.closeable) {
      this.closed.emit();
    }
  }

  resize() {
    this.isFullScreen = !this.isFullScreen;

    if (this.isFullScreen) {
      this.originalWidth = this.width;
      this.width = '100%';
    } else {
      this.width = this.originalWidth;
    }
  }
}
