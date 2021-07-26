import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeadlineModule } from '../headline.module';

describe('HeaderComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    template: `
      <spy-headline>
        <div class="default-content"></div>
        <div actions class="actions-content"></div>
      </spy-headline>
    `,
  })
  class TestComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeadlineModule],
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render default content in the `.spy-headline__col--heading` element', () => {
    const headingContentElement = fixture.debugElement.query(
      By.css('.spy-headline__col--heading .default-content'),
    );

    expect(headingContentElement).toBeTruthy();
  });

  it('should render default content in the last `.spy-headline__col` element', () => {
    const actionsContentElement = fixture.debugElement.query(
      By.css('.spy-headline__col:last-child .actions-content'),
    );

    expect(actionsContentElement).toBeTruthy();
  });
});
