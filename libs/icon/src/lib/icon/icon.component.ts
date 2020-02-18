import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'spy-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
