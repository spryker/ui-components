import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'spy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CardComponent implements OnInit {
  @Input() title: string | TemplateRef<void> = '';
  @Input() extra: TemplateRef<void> | undefined;
  @Input() actions: TemplateRef<void>[] | undefined[] = [];

  ngOnInit(): void {}
}
