import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  Input,
  OnInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'spy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  @Input() title: string | TemplateRef<void> = '';
  @Input() extra: TemplateRef<void> | undefined;
  @Input() actions: TemplateRef<void>[] | undefined[] = [];
  @Input() titlePosition: 'left' | 'center' | 'right' = 'left';

  constructor(private elemRef: ElementRef) {}

  ngOnInit(): void {
    console.log('CardComponent#ngOnInit', this.elemRef.nativeElement);
  }
}
