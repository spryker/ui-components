import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { IStory } from '@storybook/angular';
import { boolean } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';
import { NzModalWrapperComponent } from './wrappers';
import { HtmlModalStrategy } from './strategies/html.strategy';

export default {
  title: 'ModalComponent',
};

@Component({
  selector: 'spy-story',
  template: `
    <h3>Content</h3>

    <p>
      <button (click)="closeAll()">Close All</button>
    </p>

    <p>
      <button (click)="openModalTpl(modal)">Open Template</button>
    </p>

    <p>
      <button (click)="openModalHtml()">Open Html</button>
    </p>

    <ng-template #modal let-data let-modal="modalRef">
      Modal content here! {{ data }}
      <button (click)="modal.close()">Close</button>
    </ng-template>
  `,
})
class StoryComponent {
  @Input() hasBackdrop?: boolean;

  private modalNumber = 0;

  constructor(private modalService: ModalService) {}

  closeAll() {
    this.modalService.closeAll();
  }

  openModalTpl(template: TemplateRef<any>) {
    this.modalService.openTemplate(template, {
      title: 'Template Modal',
      data: ++this.modalNumber,
      backdrop: this.hasBackdrop,
    });
  }

  openModalHtml() {
    const modal = this.modalService.open(
      new HtmlModalStrategy({
        html: name => `
          <h3>Hello ${name}</h3>
          Content from <b>html</b>!
          <button class="close">Close</button>
        `,
        process: (children, modalRef) => {
          const button = children.find(c =>
            (c as HTMLElement).classList?.contains('close'),
          ) as HTMLElement;
          button.addEventListener('click', () => modalRef.close());
        },
      }),
      {
        title: 'Html Modal',
        data: 'Nark',
        backdrop: this.hasBackdrop,
      },
    );

    setTimeout(() => modal.updateData('World'), 200);
  }
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [ModalModule.forRoot(), BrowserAnimationsModule],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [NzModalWrapperComponent],
        multi: true,
      },
    ],
  },
  component: StoryComponent,
  props: {
    hasBackdrop: boolean('Has backdrop', true),
  },
});

@Component({
  selector: 'spy-story',
  template: `
    <spy-modal [(visible)]="visible">
      <ng-template let-modalRef="modalRef">
        <h3>Modal content here...</h3>

        <button (click)="modalRef.close()">Close</button>
      </ng-template>
    </spy-modal>
    <button (click)="visible = !visible">Modal drawer</button>
  `,
})
class SimpleModalComponent {
  visible = false;
}

export const viaModalComponent = (): IStory => ({
  moduleMetadata: {
    imports: [ModalModule.forRoot(), BrowserAnimationsModule],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [NzModalWrapperComponent],
        multi: true,
      },
    ],
  },
  component: SimpleModalComponent,
  props: {},
});

@Component({
  selector: 'spy-story',
  template: `
    <p>
      <button (click)="openConfirm()">Open Confirm</button>
    </p>

    <ng-template #modal let-data let-modal="modalRef">
      Explanatory text goes here.
    </ng-template>
  `,
})
class ConfirmationComponent {
  @Input() hasBackdrop?: boolean;
  @Input() hasDescription?: boolean;

  constructor(private modalService: ModalService) {}

  closeAll() {
    this.modalService.closeAll();
  }

  openConfirm() {
    this.modalService
      .openConfirm({
        title: 'Discard unsaved changes?',
        description: this.hasDescription
          ? 'Explanatory text goes here.'
          : undefined,
        okText: 'Button',
        cancelText: 'Cancel',
        backdrop: this.hasBackdrop,
      })
      .afterDismissed()
      .subscribe(isSure => console.log('Was sure?', isSure));
  }
}

export const confirmation = (): IStory => ({
  moduleMetadata: {
    imports: [ModalModule.forRoot(), BrowserAnimationsModule],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [NzModalWrapperComponent],
        multi: true,
      },
    ],
  },
  component: ConfirmationComponent,
  props: {
    hasBackdrop: boolean('Has backdrop', true),
    hasDescription: boolean('Has description', true),
  },
});
