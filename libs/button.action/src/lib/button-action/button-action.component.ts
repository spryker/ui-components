import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'spy-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
