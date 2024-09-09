import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSlideComponent } from './carousel-slide.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CarouselSlideComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    const slideContent = 'Slide content';
    const thumbContent = 'Thumb content';

    const projectedContent = `
    <spy-carousel-slide #carouselSlide>
      <div class="slide-content">${slideContent}</div>
      <div thumb class="thumb-content">${thumbContent}</div>
    </spy-carousel-slide>
    <div class="slide-content-outlet">
      <ng-container *ngTemplateOutlet="carouselSlide.template"></ng-container>
    </div>
    <div class="thumb-content-outlet">
      <ng-container *ngTemplateOutlet="carouselSlide.thumbTemplate"></ng-container>
    </div>
    `;

    @Component({
        template: projectedContent,
    })
    class TestHostComponent {}

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselSlideComponent, TestHostComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render slide content', () => {
        const slideContentEl = fixture.debugElement.query(By.css('.slide-content-outlet .slide-content'));
        expect(slideContentEl).toBeTruthy();
        expect(slideContentEl.nativeElement.textContent).toBe(slideContent);
    });

    it('should render thumb content', () => {
        const thumbContentEl = fixture.debugElement.query(By.css('.thumb-content-outlet .thumb-content'));
        expect(thumbContentEl).toBeTruthy();
        expect(thumbContentEl.nativeElement.textContent).toBe(thumbContent);
    });
});
