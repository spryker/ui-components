import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs/operators';

import { DrawerData } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerService } from '../drawer.service';
import { DrawerTemplateContext } from '../types';

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
  @Output() isOpenChange = new EventEmitter<boolean>();

  @ViewChild('contentTpl') contentTpl?: TemplateRef<any>;

  @ContentChild(TemplateRef) templateRef?: TemplateRef<DrawerTemplateContext>;

  private drawerRef?: DrawerRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private drawerService: DrawerService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.updateDrawer();
  }

  ngOnChanges(): void {
    this.updateDrawer();
  }

  ngOnDestroy(): void {
    this.close();
  }

  open() {
    const template = this.templateRef || this.contentTpl;

    if (!template) {
      return;
    }

    this.close();

    this.drawerRef = this.drawerService.openTemplate(template, this);

    this.drawerRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.close());

    this.isOpen = true;
    this.isOpenChange.emit(true);
    this.cdr.markForCheck();
  }

  close() {
    if (!this.drawerRef) {
      return;
    }

    this.drawerRef.close();
    this.drawerRef = undefined;

    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.cdr.markForCheck();
  }

  private updateDrawer() {
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }
}
