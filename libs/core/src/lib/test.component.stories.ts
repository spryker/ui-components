import { CommonModule } from '@angular/common';
import {
  Component,
  Injector,
  Input,
  NgModule,
  NO_ERRORS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CustomElementMethod,
  CustomElementModule,
  NgWebComponent,
  SelectComponentsModule,
  WebComponentDefs,
} from '@spryker/web-components';
import { IStory } from '@storybook/angular';
import { NzInputModule } from 'ng-zorro-antd/input';

import { TestComponent } from './test.component';

export default {
  title: 'TestComponent',
};

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [NzInputModule],
  },
  component: TestComponent,
  props: {},
});

export function crossComponentCommunication(): IStory {
  @Component({
    selector: 'a',
    template: `
      <span
        style="display: none"
        [spySelectComponents]="bComponentType"
        (spySelectComponentsFound)="bComponentsFound($event)"
      >
        <ng-content></ng-content>
      </span>
      <span *ngFor="let tab of tabs">{{ tab.title }}</span>
      <div *ngFor="let tab of tabs">
        <ng-container *ngTemplateOutlet="tab.tpl"></ng-container>
      </div>
    `,
  })
  class AComponent {
    bComponentType = BComponent;
    tabs?: { tpl: TemplateRef<void>; title?: string }[];

    bComponentsFound(components: NgWebComponent<BComponent>[]) {
      this.tabs = components.map(c => ({
        tpl: c.getTemplate(),
        title: c.title,
      }));
    }
  }

  @Component({
    selector: 'b',
    template: `
      <ng-template #tpl>
        <ng-content></ng-content>
      </ng-template>
    `,
  })
  class BComponent {
    @Input() title?: string;

    @ViewChild('tpl') tpl?: TemplateRef<void>;

    @CustomElementMethod()
    getTemplate() {
      return this.tpl!;
    }
  }

  @NgModule({
    imports: [CommonModule, SelectComponentsModule],
    declarations: [AComponent, BComponent],
    entryComponents: [AComponent, BComponent],
  })
  class StoryModule extends CustomElementModule {
    protected components: WebComponentDefs = [
      {
        selector: 'a-a',
        component: AComponent,
      },
      {
        selector: 'a-b',
        component: BComponent,
      },
    ];

    constructor(injector: Injector) {
      super(injector);
      super.ngDoBootstrap();
      this.custom();
    }

    async custom() {
      await customElements.whenDefined('a-b');
      class MyB extends customElements.get('a-b') {}
      customElements.define('my-b', MyB);
    }
  }

  return {
    moduleMetadata: {
      imports: [StoryModule],
      schemas: [NO_ERRORS_SCHEMA],
    },
    template: `
      <a-a>
        <a-b title="lol1">tab1</a-b>
        <a-b title="lol2">tab2</a-b>
        <my-b title="lol3">tab3</my-b>
      </a-a>
    `,
  };
}
