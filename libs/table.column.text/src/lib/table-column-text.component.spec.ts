import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { TableColumnTextComponent } from './table-column-text.component';

const configMock: any = [{ text: 'mockedText' }, { text: '${value}' }];

const context: any = { value: 'mockedText' };

describe('TableColumnTextComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DefaultContextSerializationModule],
            declarations: [TableColumnTextComponent, ContextPipe],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnTextComponent);
    });

    it('Template must render value text from config', async () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(configMock[0].text);
    });

    it('Template must render value text with dynamic text string from context', async () => {
        fixture.componentRef.setInput('config', configMock[1]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(context.value);
    });
});
