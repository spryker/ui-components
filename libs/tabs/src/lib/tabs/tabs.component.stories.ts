import { TabsModule } from '../tabs.module';
import { TabsComponent } from './tabs.component';
import { TabComponent } from '../tab/tab.component';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  WebComponentsModule,
  CustomElementModule,
  WebComponentDefs,
} from '@spryker/web-components';

export default {
  title: 'TabsComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TabsModule],
  },
  template: `
    <spy-tabs>
      <spy-tab spyTitle="Test Title 1">
        Tab Content 1
      </spy-tab>
      <spy-tab spyTitle="Test Title 2" disabled="true">
        Tab Content 2
      </spy-tab>
      <spy-tab spyTitle="Test Title 3" hasWarning="true">
        Tab Content 3
      </spy-tab>
    </spy-tabs>
  `,
});

@NgModule({
  imports: [WebComponentsModule.forRoot(), TabsModule],
  entryComponents: [TabsComponent, TabComponent],
})
class StoryModule extends CustomElementModule {
  components: WebComponentDefs = [TabsComponent, TabComponent];

  constructor(injector: Injector) {
    super(injector);
    super.ngDoBootstrap();
  }
}

export const asWebComponents = () => ({
  moduleMetadata: {
    imports: [StoryModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-tabs>
      <web-spy-tab spy-title="Test Title 1">
        Tab Content 1
      </web-spy-tab>
      <web-spy-tab spy-title="Test Title 2" disabled="true">
        Tab Content 2
      </web-spy-tab>
      <web-spy-tab spy-title="Test Title 3" has-warning="true">
        Tab Content 3
      </web-spy-tab>
    </web-spy-tabs>
  `,
});
