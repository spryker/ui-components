import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'spy-test',
  template: `
    <input nz-input value="test" />
  `,
  styleUrls: ['./test.component.less', './test.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TestComponent {}
