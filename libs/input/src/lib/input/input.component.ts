import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'spy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnChanges {
  @Input() prefix: string | TemplateRef<void> = '';
  @Input() suffix: string | TemplateRef<void> = '';
  @Input() name = '';
  @Input() value: any = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() attrs: Record<string, string> = {};
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
