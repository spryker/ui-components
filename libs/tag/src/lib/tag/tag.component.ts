import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TagComponent implements OnInit {
  @Input() disabled = false;
  constructor() {}

  ngOnInit(): void {}
}
