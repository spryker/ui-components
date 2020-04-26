import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { TableFeaturesRendererDirective } from './table-features-renderer.directive';
import { FeatureRecord } from './types';

@Directive({
  selector: '[spyTableRenderFeature]',
})
export class TableRenderFeatureDirective implements OnInit {
  @Input() spyTableRenderFeature?: FeatureRecord;
  @Input() spyTableRenderFeatureRenderer?: TableFeaturesRendererDirective;

  constructor(private elemRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.spyTableRenderFeature || !this.spyTableRenderFeatureRenderer) {
      throw new Error(
        `TableRenderFeatureDirective: No info about feature and/or it's renderer!`,
      );
    }

    this.spyTableRenderFeatureRenderer.renderFeatureTo(
      this.elemRef,
      this.spyTableRenderFeature,
    );
  }
}
