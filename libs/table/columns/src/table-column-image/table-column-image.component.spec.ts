// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnImageComponent } from './table-column-image.component';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

const configMock: any = [
  {
    src: 'imageSrc',
  },
  {
    src: '${value}',
  },
];

const context: any = {
  value: 'imageSrc',
};

describe('TableColumnImageComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnImageComponent,
    {
      ngModule: {
        imports: [DefaultContextSerializationModule],
        declarations: [ContextPipe],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('Template must render image node', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const imageElem = host.queryCss('img');

    expect(imageElem).toBeTruthy();
  });

  it('Image should have src from config', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const imageElem = host.queryCss('img');

    expect(imageElem!.properties.src).toBe(configMock[0].src);
  });

  it('Image should have src with dynamic text string from context', async () => {
    const host = await createComponent(
      { config: configMock[1], context },
      true,
    );
    const imageElem = host.queryCss('img');

    expect(imageElem!.properties.src).toBe(context.value);
  });
});
