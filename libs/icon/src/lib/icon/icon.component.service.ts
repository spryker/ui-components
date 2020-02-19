import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'spy-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class IconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
