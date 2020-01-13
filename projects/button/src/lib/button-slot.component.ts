import { Component } from '@angular/core';

import { WebComponentType } from '../custom-element.module';

@Component({
  selector: 'spy-button-slot-ng',
  template: `
    Default text!
  `,
  styles: [``],
})
export class ButtonSlotComponent {
  static selector: WebComponentType['selector'] = 'spy-button-slot';
}
