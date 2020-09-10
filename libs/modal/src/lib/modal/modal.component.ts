import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalService } from '../modal.service';
import { ComponentModal } from '../strategies/component';
import { ModalRef, ModalTemplateContext } from '../types';

@Component({
  selector: 'spy-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input() visible?: boolean;
  @Input() data?: unknown;
  @Input() component?: Type<ComponentModal>;

  @Output() visibleChange = new EventEmitter<boolean>();

  @ViewChild('contentTpl') contentTpl?: TemplateRef<any>;

  @ContentChild(TemplateRef) templateRef?: TemplateRef<
    ModalTemplateContext<any>
  >;

  private modalRef?: ModalRef<any, any>;

  private destroyed$ = new Subject<void>();

  constructor(private modalService: ModalService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('visible' in changes) {
      const isVisible = changes.visible.currentValue;

      if (isVisible) {
        this.open(true);
      }

      if (!isVisible) {
        this.close();
      }
    }

    if ('component' in changes) {
      this.open(true);
    }
  }

  open(forceReopen?: boolean): void {
    if (this.modalRef && forceReopen) {
      this.modalRef.close();
      this.modalRef = undefined;
    }

    if (this.modalRef && !forceReopen) {
      return;
    }

    if (this.component) {
      this.modalRef = this.modalService.openComponent(this.component, {
        data: this.data,
      });
    }

    const template = this.templateRef || this.contentTpl;

    if (!template) {
      return;
    }

    this.modalRef = this.modalService.openTemplate(template, {
      data: this.data,
    });
    this.visibleChange.emit(true);

    this.modalRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.visibleChange.emit(false);
        this.modalRef = undefined;
      });
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.close();
  }
}
