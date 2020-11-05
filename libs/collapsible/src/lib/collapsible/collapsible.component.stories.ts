import { CollapsibleModule } from '../collapsible.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

export default {
  title: 'CollapsibleComponent',
};

@Component({
  selector: 'spy-story',
  template: `
    Collapse Content
  `,
})
class StoryComponent {
  constructor() {
    console.log('Story component initialized');
  }
}

export const primary = () => ({
  moduleMetadata: {
    imports: [CollapsibleModule, BrowserAnimationsModule],
    declarations: [StoryComponent],
  },
  template: `
    <spy-collapsible alwaysRender="false" spyTitle="Collapsible Title">
      <spy-story></spy-story>
    </spy-collapsible>
  `,
});

export const withTemplate = () => ({
  moduleMetadata: {
    imports: [CollapsibleModule, BrowserAnimationsModule],
    declarations: [StoryComponent],
  },
  template: `
    <spy-collapsible alwaysRender="false" spyTitle="Collapsible Template Title">
      <ng-template>
        <spy-story></spy-story>
      </ng-template>
    </spy-collapsible>
  `,
});
