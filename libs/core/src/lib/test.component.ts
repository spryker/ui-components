import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'spy-test',
  template: `
    <h1>semibbold</h1>
    <input nz-input value="test" />
  `,
  styleUrls: ['./test.component.less', './test.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class TestComponent {}
