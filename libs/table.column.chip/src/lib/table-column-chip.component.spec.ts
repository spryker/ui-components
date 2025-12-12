import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { ChipsComponent, ChipsModule } from '@spryker/chips';
import { TableColumnChipComponent } from './table-column-chip.component';

const configMock: any = [
    { text: 'mockedText', color: 'green' },
    { text: '${value}', maxWidth: '100px' },
];

const context: any = { value: 'mockedValue' };

describe('TableColumnChipComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qDir = <T>(dir: any) => fixture.debugElement.query(By.directive(dir));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChipsModule, DefaultContextSerializationModule],
            declarations: [TableColumnChipComponent, ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnChipComponent);
    });

    it('Template must render <spy-chips> component', () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const chipsDe = q('spy-chips');
        expect(chipsDe).toBeTruthy();
    });

    it('Input color must be bound to `className` of <spy-chips> component', () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const chipsDe = q('spy-chips');
        expect(chipsDe.nativeElement.className).toContain(configMock[0].color);
    });

    it('Input text with dynamic text string must be content of <spy-chips> component', () => {
        fixture.componentRef.setInput('config', configMock[1]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const chipsDe = q('spy-chips');
        expect(chipsDe.nativeElement.textContent).toContain(context.value);
    });

    it('should bound `config.maxWidth` to `maxWidth` of <spy-chips> component', () => {
        fixture.componentRef.setInput('config', configMock[1]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const chipsCmp = qDir<ChipsComponent>(ChipsComponent).componentInstance as ChipsComponent;
        expect(chipsCmp.maxWidth).toBe(configMock[1].maxWidth);
    });
});
