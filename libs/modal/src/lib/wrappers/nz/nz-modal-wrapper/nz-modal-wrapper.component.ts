import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'spy-nz-modal-wrapper',
  templateUrl: './nz-modal-wrapper.component.html',
  styleUrls: ['./nz-modal-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NzModalWrapperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
