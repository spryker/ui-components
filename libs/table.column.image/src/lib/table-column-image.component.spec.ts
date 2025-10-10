import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { TableColumnImageComponent } from './table-column-image.component';

const configMock: any = [{ src: 'imageSrc', alt: 'Value for testing' }, { src: '${value}' }];

const context: any = { value: 'imageSrc' };

describe('TableColumnImageComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DefaultContextSerializationModule],
            declarations: [TableColumnImageComponent, ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnImageComponent);
    });

    it('Template must render <img> element', async () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const imageElem = q('img');
        expect(imageElem).toBeTruthy();
    });

    it('Image should have `src` from config', async () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const imageElem = q('img').nativeElement as HTMLImageElement;
        expect(imageElem.getAttribute('src')).toBe(configMock[0].src);
    });

    it('Image should have `alt` from config', async () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const imageElem = q('img').nativeElement as HTMLImageElement;
        expect(imageElem.getAttribute('alt')).toBe(configMock[0].alt);
    });

    it('Image should have `src` with dynamic text string from context', async () => {
        fixture.componentRef.setInput('config', configMock[1]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const imageElem = q('img').nativeElement as HTMLImageElement;
        expect(imageElem.getAttribute('src')).toBe(context.value);
    });
});
