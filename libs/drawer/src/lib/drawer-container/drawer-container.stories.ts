import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { boolean, text } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { DrawerPocModule } from '../drawer.module';
import { DrawerContainerComponent } from './drawer-container.component';

export default {
  title: 'DrawerContainerComponent',
};

@Component({
  selector: 'spy-story',
  template: `
    <p><button (click)="addDrawer(drawerTpl)">Add drawer</button></p>
    <p><button (click)="closeAll()">Close all</button></p>
    <spy-drawer-container #drawerContainer></spy-drawer-container>
    <ng-template #drawerTpl let-drawerRef>
      <h3>Drawer content here...</h3>
      <button (click)="drawerRef.close()">Close from inside</button>
    </ng-template>
  `,
})
class StoryComponent {
  @Input() closeable = true;
  @Input() width = '50%';
  @Input() resizable = true;

  @ViewChild('drawerContainer', { static: true })
  drawerContainer!: DrawerContainerComponent;

  addDrawer(tplRef: TemplateRef<any>) {
    this.drawerContainer.openTemplate(tplRef, {
      closeable: this.closeable,
      width: this.width,
      hasBackdrop: false,
      resizable: this.resizable,
    });
  }

  closeAll() {
    this.drawerContainer.closeAll();
  }
}

export const primary = (): IStory => ({
  moduleMetadata: { imports: [DrawerPocModule] },
  component: StoryComponent,
  props: {
    closeable: boolean('Closeable', true),
    resizable: boolean('Resizable', true),
    width: text('Width', '50%'),
  },
});
