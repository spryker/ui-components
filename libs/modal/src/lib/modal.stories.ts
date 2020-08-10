import { Component, Input, TemplateRef } from '@angular/core';
import { IStory } from '@storybook/angular';
import { boolean } from '@storybook/addon-knobs';

import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';
import { HtmlModalStrategy } from './strategies/html';

export default {
  title: 'Modal',
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

    <p>
      <button (click)="openConfirm()">Open Confirm</button>
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

  openConfirm() {
    this.modalService
      .openConfirm({
        title: 'Are you sure?',
        okText: 'Sure!',
        cancelText: 'Not really',
        backdrop: this.hasBackdrop,
      })
      .afterDismissed()
      .subscribe(isSure => console.log('Was sure?', isSure));
  }
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [ModalModule.forRoot()],
  },
  component: StoryComponent,
  props: {
    hasBackdrop: boolean('Has backdrop', true),
  },
});
