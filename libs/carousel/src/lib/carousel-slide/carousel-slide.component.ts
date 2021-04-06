import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'spy-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselSlideComponent implements OnInit {
  @Input() @ToBoolean() isThumb = false;
  @ViewChild('contentTpl') template!: TemplateRef<void>;

  constructor(public carouselComponent?: CarouselComponent) {}

  ngOnInit(): void {
    this.carouselComponent?.registerSlide(this);
  }

  ngOnDestroy(): void {
    this.carouselComponent?.unregisterRadio(this);
  }
}
