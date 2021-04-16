import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NgModule,
  NO_ERRORS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CustomElementMethod,
  NgWebComponent,
  SelectComponentsModule,
  WebComponentsModule,
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
      this.tabs = components.map((c) => ({
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
    declarations: [AComponent, BComponent],
    imports: [
      CommonModule,
      SelectComponentsModule,
      WebComponentsModule.forRoot(),
      WebComponentsModule.withComponents([
        { selector: 'a-a', component: AComponent },
        { selector: 'a-b', component: BComponent },
      ]),
    ],
    entryComponents: [AComponent, BComponent],
  })
  class StoryModule {
    constructor() {
      this.custom();
    }

    async custom() {
      await customElements.whenDefined('a-b');
      class MyB extends customElements.get('a-b') {}
      customElements.define('my-b', MyB as any);
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

export function customElementsExample(): IStory {
  @Component({
    selector: `spy-a`,
    template: `
      AComponent
      <ng-content></ng-content>
    `,
  })
  class AComponent {}

  @Component({
    selector: `spy-b`,
    template: `
      BComponent
      <ng-content></ng-content>
    `,
  })
  class BComponent {}

  return {
    moduleMetadata: {
      declarations: [AComponent, BComponent],
      imports: [
        WebComponentsModule.forRoot(),
        WebComponentsModule.withComponents([
          { component: AComponent, isRoot: true },
          { component: BComponent },
        ]),
      ],
      entryComponents: [AComponent, BComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
    template: `
      <web-spy-a>
        <web-spy-b>
          Content here...
        </web-spy-b>
      </web-spy-a>
    `,
  };
}
