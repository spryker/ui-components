import { InputComponent } from './input.component';
import { InputModule } from '../input.module';

export default {
  title: 'InputComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    name: 'some-name',
  },
});

export const withPrefix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    prefix: 'prefix',
  },
});

export const withOuterPrefix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    outerPrefix: 'prefix',
  },
});

export const withSuffix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    suffix: 'suffix',
  },
});

export const withOuterSuffix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    outerSuffix: 'suffix',
  },
});
