import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule } from '@spryker/input';
import { IStory } from '@storybook/angular';

import { FormItemModule } from '../form-item.module';

export default {
  title: 'FormItemComponent',
};

@NgModule({
  imports: [BrowserAnimationsModule],
  exports: [FormItemModule, InputModule],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-form-item for="input-id1">
      Label
      <spy-input spyId="form-id1" type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item for="input-id2">
      Label
      <spy-input spyId="form-id2" type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const withError = (): IStory => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-form-item error="Error Message">
      Label
      <spy-input placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const required = (): IStory => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-form-item required>
      Label
      <spy-input placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const noLabel = (): IStory => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-form-item [noLabel]="true">
      Hidden label!
      <spy-input placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const noSpaces = (): IStory => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-form-item noSpaces>
      Label
      <spy-input type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item noSpaces>
      Label
      <spy-input type="text" control></spy-input>
    </spy-form-item>
  `,
});
