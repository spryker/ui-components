import { boolean, select } from '@storybook/addon-knobs';

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'spy-story-component',
  styleUrls: ['./grid.component.stories.less'],
  template: '',
  encapsulation: ViewEncapsulation.None,
})
class StoryComponent {}

export default {
  title: 'GridComponent',
};

export const primary = () => ({
  moduleMetadata: {
    declarations: [StoryComponent],
  },
  template: `
    <spy-story-component></spy-story-component>

    <div class="spy-row spy-row-gutter-{{ gutter }}">
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col</p></div>
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col</p></div>
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col</p></div>

      <div class="spy-col-11 spy-col-gutter-{{ gutter }}"><p>spy-col-11</p></div>
      <div class="spy-col-1 spy-col-gutter-{{ gutter }}"><p>spy-col-1</p></div>

      <div class="spy-col-10 spy-col-gutter-{{ gutter }}"><p>spy-col-10</p></div>
      <div class="spy-col-2 spy-col-gutter-{{ gutter }}"><p>spy-col-2</p></div>

      <div class="spy-col-9 spy-col-gutter-{{ gutter }}"><p>spy-col-9</p></div>
      <div class="spy-col-3 spy-col-gutter-{{ gutter }}"><p>spy-col-3</p></div>

      <div class="spy-col-8 spy-col-gutter-{{ gutter }}"><p>spy-col-8</p></div>
      <div class="spy-col-4 spy-col-gutter-{{ gutter }}"><p>spy-col-4</p></div>

      <div class="spy-col-7 spy-col-gutter-{{ gutter }}"><p>spy-col-7</p></div>
      <div class="spy-col-5 spy-col-gutter-{{ gutter }}"><p>spy-col-5</p></div>

      <div class="spy-col-6 spy-col-gutter-{{ gutter }}"><p>spy-col-6</p></div>
      <div class="spy-col-6 spy-col-gutter-{{ gutter }}"><p>spy-col-6</p></div>
    </div>
  `,
  props: {
    gutter: select('Gutter', {
      'None none (default)': 'none',
      '8px sm': 'sm',
      '16px md': 'md',
      '24px lg': 'lg',
    }, 'none'),
  },
});

export const alignment = () => ({
  moduleMetadata: {
    declarations: [StoryComponent],
  },
  template: `
    <spy-story-component></spy-story-component>

    <div class="
      grid-with-height
      spy-row spy-row-gutter-md
      spy-row-direction-{{ direction }}
      spy-row-align-col-{{ alignCol }}
      spy-row-align-row-{{ alignRow }}
    ">
      <div class="spy-col-3 spy-col-gutter-md"><p>spy-col-3</p></div>
      <div class="spy-col-5 spy-col-gutter-md"><p>spy-col-5</p></div>

      <div class="spy-col-8 spy-col-gutter-md"><p>spy-col-10</p></div>
      <div class="spy-col-2 spy-col-gutter-md"><p>spy-col-2</p></div>
    </div>
  `,
  props: {
    direction: select('Direction', {
      'Row (default)': 'row',
      'Column': 'column',
      'Row reverse': 'row-reverse',
      'Column reverse': 'column-reverse',
    }, 'row'),

    alignCol: select('Align col', {
      'Stretch (default)': 'stretch',
      'Flex-start': 'flex-start',
      'Center': 'center',
      'Flex end': 'flex-end',
      'Space between (work with column/column-reverse direction)': 'space-between',
      'Space around (work with column/column-reverse direction)': 'space-around',
      'Space evenly (work with column/column-reverse direction)': 'space-evenly',
      'Baseline (work with row/row-reverse direction)': 'baseline',
    }, 'stretch'),

    alignRow: select('Align row', {
      'Flex-start (default)': 'flex-start',
      'Center': 'center',
      'Flex end': 'flex-end',
      'Space between (work with row/row-reverse direction)': 'space-between',
      'Space around (work with row/row-reverse direction)': 'space-around',
      'Space evenly (work with row/row-reverse direction)': 'space-evenly',
      'Stretch': 'stretch',
      'Baseline (work with column/column-reverse direction)': 'baseline',
    }, 'flex-start'),
  },
})
