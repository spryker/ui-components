import { Component, ViewEncapsulation } from '@angular/core';
import { select } from '@storybook/addon-knobs';

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

    <p>Row classes</p>
    <br>
    <ul>
      <li>spy-row</li>
      <li>spy-row-gutter-{{ gutter }}</li>
    </ul>
    <br>
    <br>
    <div class="spy-row spy-row-gutter-{{ gutter }}">
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col</p></div>
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col</p></div>
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col</p></div>

      <div class="spy-col-11 spy-col-gutter-{{ gutter }}"><p>spy-col-11 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col-1 spy-col-gutter-{{ gutter }}"><p>spy-col-1 spy-col-gutter-{{ gutter }}</p></div>

      <div class="spy-col-10 spy-col-gutter-{{ gutter }}"><p>spy-col-10 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col-2 spy-col-gutter-{{ gutter }}"><p>spy-col-2 spy-col-gutter-{{ gutter }}</p></div>

      <div class="spy-col-9 spy-col-gutter-{{ gutter }}"><p>spy-col-9 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col-3 spy-col-gutter-{{ gutter }}"><p>spy-col-3 spy-col-gutter-{{ gutter }}</p></div>

      <div class="spy-col-8 spy-col-gutter-{{ gutter }}"><p>spy-col-8 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col-4 spy-col-gutter-{{ gutter }}"><p>spy-col-4 spy-col-gutter-{{ gutter }}</p></div>

      <div class="spy-col-7 spy-col-gutter-{{ gutter }}"><p>spy-col-7 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col-5 spy-col-gutter-{{ gutter }}"><p>spy-col-5 spy-col-gutter-{{ gutter }}</p></div>

      <div class="spy-col-6 spy-col-gutter-{{ gutter }}"><p>spy-col-6 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col-6 spy-col-gutter-{{ gutter }}"><p>spy-col-6 spy-col-gutter-{{ gutter }}</p></div>

      <div class="spy-col-12 spy-col-gutter-{{ gutter }}"><p>spy-col-12 spy-col-gutter-{{ gutter }}</p></div>
      <div class="spy-col spy-col-gutter-{{ gutter }}"><p>spy-col spy-col-gutter-{{ gutter }}</p></div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>

    <h3> With breakpoints </h3>
    <br>
    <p>Row classes</p>
    <br>
    <ul>
      <li>spy-row</li>
      <li>spy-row-sm-gutter-sm</li>
      <li>spy-row-sm-gutter-sm</li>
      <li>spy-row-md-gutter-md</li>
      <li>spy-row-xl-gutter-lg</li>
    </ul>
    <br>
    <br>
    <div class="spy-row spy-row-sm-gutter-sm spy-row-md-gutter-md spy-row-xl-gutter-lg">
      <div class="spy-col-sm-6 spy-col-md-3 spy-col-lg-12 spy-col-xl-7 spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg">
        <p>
          spy-col-sm-6 spy-col-md-3 spy-col-lg-12 spy-col-xl-7
          <br>
          spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg
        </p>
      </div>
      <div class="spy-col-sm-6 spy-col-md-9 spy-col-lg-12 spy-col-xl-5 spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg">
        <p>
          spy-col-sm-6 spy-col-md-9 spy-col-lg-12 spy-col-xl-5
          <br>
          spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg
        </p>
      </div>

      <div class="spy-col-sm-6 spy-col-md-8 spy-col-lg-4 spy-col-xl-12 spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg">
        <p>
          spy-col-sm-6 spy-col-md-8 spy-col-lg-4 spy-col-xl-12
          <br>
          spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg
        </p>
      </div>

      <div class="spy-col-sm-6 spy-col-md-4 spy-col-lg-8 spy-col-xl-12 spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg">
        <p>
          spy-col-sm-6 spy-col-md-4 spy-col-lg-8 spy-col-xl-12
          <br>
          spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg
        </p>
      </div>

      <div class="spy-col-sm-6 spy-col-lg-hidden spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg">
        <p>
          spy-col-sm-6 spy-col-lg-hidden
          <br>
          spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg
        </p>
      </div>
      <div class="spy-col-sm-6 spy-col-lg-auto spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg">
        <p>
          spy-col-sm-6 spy-col-lg-auto
          <br>
          spy-col-sm-gutter-sm spy-col-md-gutter-md spy-col-xl-gutter-lg
        </p>
      </div>
    </div>
  `,
    props: {
        gutter: select(
            'Gutter',
            {
                'None none (default)': 'none',
                '8px sm': 'sm',
                '16px md': 'md',
                '24px lg': 'lg',
            },
            'none',
        ),
    },
});

export const alignment = () => ({
    moduleMetadata: {
        declarations: [StoryComponent],
    },
    template: `
    <spy-story-component></spy-story-component>

    <p>Row classes</p>
    <br>
    <p>COMMON</p>
    <ul>
      <li>spy-row</li>
      <li>spy-row-gutter-md</li>
      <li>spy-row-full-height</li>
    </ul>
    <br>
    <p>DYNAMIC</p>
    <ul>
      <li>spy-row-direction-{{ direction }}</li>
      <li>spy-row-align-col-{{ alignCol }}</li>
      <li>spy-row-align-row-{{ alignRow }}</li>
      <li>spy-row-align-content-{{ alignContent }}</li>
    </ul>
    <br>
    <br>
    <div class="container-with-height">
      <div class="
        spy-row spy-row-gutter-md spy-row-full-height
        spy-row-direction-{{ direction }}
        spy-row-align-col-{{ alignCol }}
        spy-row-align-row-{{ alignRow }}
        spy-row-align-content-{{ alignContent }}
      ">
        <div class="spy-col-3 spy-col-gutter-md"><p>spy-col-3 spy-col-gutter-md <span class="expander"></span></p></div>
        <div class="spy-col-5 spy-col-gutter-md"><p>spy-col-5 spy-col-gutter-md</p></div>

        <div class="spy-col-8 spy-col-gutter-md"><p>spy-col-10 spy-col-gutter-md</p></div>
        <div class="spy-col-2 spy-col-gutter-md"><p>spy-col-2 spy-col-gutter-md</p></div>
      </div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>

    <h3 class="spy-col"> With breakpoints </h3>
    <br>

    <p>Row classes</p>
    <br>
    <p>COMMON</p>
    <ul>
      <li>spy-row</li>
      <li>spy-row-gutter-md</li>
      <li>spy-row-full-height</li>
    </ul>
    <br>
    <p>SM</p>
    <ul>
      <li>spy-row-sm-direction-column-reverse</li>
      <li>spy-row-sm-align-col-space-around</li>
      <li>spy-row-sm-align-row-center</li>
    </ul>
    <br>
    <p>MD</p>
    <ul>
      <li>spy-row-md-direction-row-reverse</li>
      <li>spy-row-md-align-col-center</li>
      <li>spy-row-md-align-row-flex-end</li>
    </ul>
    <br>
    <p>LG</p>
    <ul>
      <li>spy-row-lg-direction-column</li>
      <li>spy-row-lg-align-col-space-between</li>
      <li>spy-row-lg-align-row-flex-start</li>
    </ul>
    <br>
    <p>XL</p>
    <ul>
      <li>spy-row-xl-direction-row</li>
      <li>spy-row-xl-align-col-flex-end</li>
      <li>spy-row-xl-align-row-center</li>
    </ul>
    <br>
    <br>
    <div class="container-with-height">
      <div class="
        spy-row spy-row-gutter-md spy-row-full-height
        spy-row-sm-direction-column-reverse
        spy-row-md-direction-row-reverse
        spy-row-lg-direction-column
        spy-row-xl-direction-row
        spy-row-sm-align-col-space-around
        spy-row-md-align-col-center
        spy-row-lg-align-col-space-between
        spy-row-xl-align-col-flex-end
        spy-row-sm-align-row-center
        spy-row-md-align-row-flex-end
        spy-row-lg-align-row-flex-start
        spy-row-xl-align-row-center
      ">
        <div class="spy-col-3 spy-col-gutter-md"><p>spy-col-3 spy-col-gutter-md<span class="expander"></span></p></div>
        <div class="spy-col-2 spy-col-gutter-md"><p>spy-col-2 spy-col-gutter-md</p></div>
        <div class="spy-col-5 spy-col-gutter-md"><p>spy-col-4 spy-col-gutter-md</p></div>
      </div>
    </div>
  `,
    props: {
        direction: select(
            'Direction',
            {
                'Row (default)': 'row',
                Column: 'column',
                'Row reverse': 'row-reverse',
                'Column reverse': 'column-reverse',
            },
            'row',
        ),

        alignCol: select(
            'Align col',
            {
                'Stretch (default)': 'stretch',
                'Flex-start': 'flex-start',
                Center: 'center',
                'Flex end': 'flex-end',
                'Space between (work with column/column-reverse direction)': 'space-between',
                'Space around (work with column/column-reverse direction)': 'space-around',
                'Space evenly (work with column/column-reverse direction)': 'space-evenly',
                'Baseline (work with row/row-reverse direction)': 'baseline',
            },
            'stretch',
        ),

        alignRow: select(
            'Align row',
            {
                'Flex-start (default)': 'flex-start',
                Center: 'center',
                'Flex end': 'flex-end',
                'Space between (work with row/row-reverse direction)': 'space-between',
                'Space around (work with row/row-reverse direction)': 'space-around',
                'Space evenly (work with row/row-reverse direction)': 'space-evenly',
                Stretch: 'stretch',
                'Baseline (work with column/column-reverse direction)': 'baseline',
            },
            'flex-start',
        ),

        alignContent: select(
            'Align content',
            {
                'Normal (default)': 'normal',
                'Flex-start': 'flex-start',
                Center: 'center',
                'Flex end': 'flex-end',
                'Space between': 'space-between',
                'Space around': 'space-around',
                'Space evenly': 'space-evenly',
                Stretch: 'stretch',
            },
            'flex-start',
        ),
    },
});

export const wrap = () => ({
    moduleMetadata: {
        declarations: [StoryComponent],
    },
    template: `
    <spy-story-component></spy-story-component>

    <div class="tight-container">
      <p>Row classes</p>
      <br>
      <ul>
        <li>spy-row</li>
        <li>spy-row-wrap-{{ wrap }}</li>
      </ul>
      <br>
      <br>
      <div class="spy-row spy-row-wrap-{{ wrap }}">
        <div class="spy-col"><p>1 spy-col</p></div>
        <div class="spy-col"><p>2 spy-col</p></div>
        <div class="spy-col"><p>3 spy-col</p></div>
        <div class="spy-col"><p>4 spy-col</p></div>
        <div class="spy-col"><p>5 spy-col</p></div>
        <div class="spy-col"><p>6 spy-col</p></div>
        <div class="spy-col"><p>7 spy-col</p></div>
      </div>
      <br>
      <br>
      <div class="spy-row spy-row-wrap-{{ wrap }}">
        <div class="spy-col spy-col-basis-auto"><p>1 spy-col spy-col-basis-auto</p></div>
        <div class="spy-col spy-col-basis-auto"><p>2 spy-col spy-col-basis-auto</p></div>
        <div class="spy-col spy-col-basis-auto"><p>3 spy-col spy-col-basis-auto</p></div>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>

      <h3> With breakpoints </h3>
      <br>
      <p>Row classes</p>
      <br>
      <ul>
        <li>spy-row</li>
        <li>spy-row-md-wrap-wrap</li>
        <li>spy-row-lg-wrap-nowrap</li>
        <li>spy-row-xl-wrap-wrap-reverse</li>
      </ul>
      <br>
      <br>
      <div class="spy-row spy-row-md-wrap-wrap spy-row-lg-wrap-nowrap spy-row-xl-wrap-wrap-reverse">
        <div class="spy-col"><p>1 spy-col</p></div>
        <div class="spy-col"><p>2 spy-col</p></div>
        <div class="spy-col"><p>3 spy-col</p></div>
        <div class="spy-col"><p>4 spy-col</p></div>
        <div class="spy-col"><p>5 spy-col</p></div>
        <div class="spy-col"><p>6 spy-col</p></div>
        <div class="spy-col"><p>7 spy-col</p></div>
      </div>
    </div>
  `,
    props: {
        wrap: select(
            'Wrap',
            {
                'Wrap (default)': 'wrap',
                Nowrap: 'nowrap',
                'Wrap Reverse': 'wrap-reverse',
            },
            'wrap',
        ),
    },
});

export const push = () => ({
    moduleMetadata: {
        declarations: [StoryComponent],
    },
    template: `
    <spy-story-component></spy-story-component>

    <div class="spy-row">
      <div class="spy-col-2 spy-col-push-left-2"><p>spy-col-2 spy-col-push-left-2</p></div>
      <div class="spy-col-4 spy-col-push-left-1"><p>spy-col-4 spy-col-push-left-1</p></div>
      <div class="spy-col-3"><p>spy-col-3</p></div>
      <div class="spy-col-3"><p>spy-col-3</p></div>
      <div class="spy-col-2 spy-col-push-right-2"><p>spy-col-2 spy-col-push-right-2</p></div>
      <div class="spy-col-4 spy-col-push-right-1"><p>spy-col-4 spy-col-push-right-1</p></div>
      <div class="spy-col-4 spy-col-push-right-2"><p>spy-col-4 spy-col-push-right-2</p></div>
      <div class="spy-col-3"><p>spy-col-3</p></div>
      <div class="spy-col-2 spy-col-push-left-1"><p>spy-col-2 spy-col-push-left-1</p></div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>

    <h3> With breakpoints </h3>
    <br>

    <div class="spy-row">
      <div class="spy-col-6 spy-col-push-left-sm-0 spy-col-push-left-md-2 spy-col-push-left-lg-4 spy-col-push-left-xl-6">
        <p>spy-col-6 spy-col-push-left-sm-0 spy-col-push-left-md-2 spy-col-push-left-lg-4 spy-col-push-left-xl-6</p>
      </div>
    </div>

    <div class="spy-row spy-row-direction-row-reverse">
      <div class="spy-col-6 spy-col-push-right-sm-0 spy-col-push-right-md-2 spy-col-push-right-lg-4 spy-col-push-right-xl-6">
        <p>spy-col-6 spy-col-push-right-sm-0 spy-col-push-right-md-2 spy-col-push-right-lg-4 spy-col-push-right-xl-6</p>
      </div>
    </div>
  `,
});

export const respectMaxWith = () => ({
    moduleMetadata: {
        declarations: [StoryComponent],
    },
    template: `
    <spy-story-component></spy-story-component>

    <div class="tight-container">
      <p>The initial setting on flex items is <strong>min-width: auto</strong>. It's causing a positioning conflict when the children is using <strong>white-space: nowrap;</strong>.</p>
      <br>
      <br>

      <div class="spy-row spy-row-wrap-nowrap card spy-row-align-col-center">
        <div class="spy-col-2">
          <span class="pic"></span>
        </div>
        <div class="spy-col">
          <span class="no-wrap-text">
            Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.
          </span>
        </div>
      </div>

      <br>
      <br>
      <p>In order for the item to stay within the container you need to set <strong>min-width: 0</strong>. In practice, you can set the <strong>spy-col-respect-max-size</strong> class</p>
      <br>
      <br>

      <div class="spy-row spy-row-wrap-nowrap card spy-row-align-col-center">
        <div class="spy-col-2">
          <span class="pic"></span>
        </div>
        <div class="spy-col spy-col-respect-max-size">
          <span class="no-wrap-text">
            Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.
          </span>
        </div>
      </div>
    </div>
    `,
});
