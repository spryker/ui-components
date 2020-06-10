import { Component, Input, TemplateRef } from '@angular/core';
import { boolean, text } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerModule } from './drawer.module';
import { DrawerService } from './drawer.service';

export default {
  title: 'Drawer',
};

@Component({
  selector: 'spy-story',
  template: `
    <p><button (click)="addDrawer(drawerTpl)">Add drawer</button></p>
    <p><button (click)="closeAll()">Close all</button></p>
    <p><button (click)="dispose()">Dispose</button></p>
    <ng-template #drawerTpl let-drawerRef>
      <h3>Drawer content here...</h3>
      <p><button (click)="drawerRef.close()">Close from inside</button></p>
      <p><button (click)="addDrawer(drawerTpl)">Add drawer</button></p>
      <p><button (click)="closeAll()">Close all</button></p>
    </ng-template>
  `,
})
class StoryComponent {
  @Input() closeable = true;
  @Input() width = '50%';
  @Input() hasBackdrop = false;
  @Input() resizable = true;

  constructor(private drawerService: DrawerService) {}

  addDrawer(tplRef: TemplateRef<any>) {
    this.drawerService.openTemplate(tplRef, {
      closeable: this.closeable,
      width: this.width,
      hasBackdrop: this.hasBackdrop,
      resizable: this.resizable,
    });
  }

  closeAll() {
    this.drawerService.closeAll();
  }

  dispose() {
    this.drawerService.ngOnDestroy();
  }
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [DrawerModule],
    entryComponents: [DrawerContainerComponent],
  },
  component: StoryComponent,
  props: {
    closeable: boolean('Closeable', true),
    resizable: boolean('Resizable', true),
    width: text('Width', '50%'),
    hasBackdrop: boolean('Has backdrop', false),
  },
});
