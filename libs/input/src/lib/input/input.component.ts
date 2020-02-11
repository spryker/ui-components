import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'spy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() prefix: string | TemplateRef<void> = '';
  @Input() suffix: string | TemplateRef<void> = '';
  @Input() name = '';
  @Input() value: any = null;
  @Input() type = '';
  @Input() attrs: Record<string, string> = {};
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
