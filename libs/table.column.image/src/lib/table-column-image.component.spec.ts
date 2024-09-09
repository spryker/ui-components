import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnImageComponent } from './table-column-image.component';

const configMock: any = [
    {
        src: 'imageSrc',
        alt: 'Value for testing',
    },
    {
        src: '${value}',
    },
];
const context: any = {
    value: 'imageSrc',
};

describe('TableColumnImageComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TableColumnImageComponent, {
        ngModule: {
            imports: [DefaultContextSerializationModule],
            declarations: [ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('Template must render <img> element', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const imageElem = host.queryCss('img');

        expect(imageElem).toBeTruthy();
    });

    it('Image should have `src` from config', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const imageElem = host.queryCss('img');

        expect(imageElem.properties.src).toBe(configMock[0].src);
    });

    it('Image should have `alt` from config', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const imageElem = host.queryCss('img');

        expect(imageElem.properties.alt).toBe(configMock[0].alt);
    });

    it('Image should have `src` with dynamic text string from context', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
        const imageElem = host.queryCss('img');

        expect(imageElem.properties.src).toBe(context.value);
    });
});
