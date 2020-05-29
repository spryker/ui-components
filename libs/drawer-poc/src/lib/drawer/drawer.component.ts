import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TypedSimpleChanges } from '@spryker/utils';

import { DrawerData } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerService } from '../drawer.service';

export class DrawerComponentInputs {
  @Input() isOpen?: boolean;
  @Input() closeable?: boolean;
  @Input() resizable?: boolean;
  @Input() width?: string;
  @Input() hasBackdrop?: boolean;
  @Input() data?: DrawerData;
}

@Component({
  selector: 'spy-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent extends DrawerComponentInputs
  implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('contentTpl') contentTpl?: TemplateRef<any>;

  private drawerRef?: DrawerRef;

  constructor(private drawerService: DrawerService) {
    super();
  }

  ngAfterViewInit(): void {
    this.open();
  }

  ngOnChanges(changes: TypedSimpleChanges<DrawerComponentInputs>): void {
    this.open();
  }

  ngOnDestroy(): void {
    this.close();
  }

  open() {
    if (!this.contentTpl) {
      return;
    }

    this.close();

    this.drawerRef = this.drawerService.openTemplate(this.contentTpl, this);
  }

  close() {
    if (this.drawerRef) {
      const drawerRef = this.drawerRef;
      this.drawerRef.close();
      this.drawerRef = undefined;
    }
  }
}
