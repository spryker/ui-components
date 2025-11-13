import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, ViewChild, AfterViewInit  } from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';
import { AutoSizeType, NzAutosizeDirective } from 'ng-zorro-antd/input';

interface TextareaAutoSize extends AutoSizeType {}

@Component({
    selector: 'spy-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent implements AfterViewInit {
    @ViewChild('autosize') autosizeInput?: NzAutosizeDirective;
    @Input() name?: string;
    @Input() value = '';
    @Input() @ToBoolean() disabled = false;
    @Input() placeholder?: string;
    @Input() rows = 4;
    @Input() cols = 4;
    @Input() @ToJson() attrs: Record<string, string> = {};
    @Input() spyId?: string;
    @Input() autoSize: boolean | TextareaAutoSize = true;
    @Output() valueChange = new EventEmitter<any>();

    ngAfterViewInit(): void {
        document.addEventListener('TABS-CHANGE-EVENT', (event) => {
            this.handleTabChangeEvent(event);
        })
    }

    handleTabChangeEvent(event) {
        const selectedTab = event.detail.tab;
        const textareaEl = (this.autosizeInput as any)?.el as HTMLElement | undefined;
        if (!selectedTab || !textareaEl) {
            return;
        }

        const tabs = selectedTab.closestTabSet?.tabs.toArray() ?? [];
        const selectedIndex = tabs.indexOf(selectedTab);
        if (selectedIndex === -1) {
            return;
        }

        const activePaneId = selectedTab.closestTabSet?.getTabContentId(selectedIndex);
        const hostPane = textareaEl.closest('[role="tabpanel"]') as HTMLElement | null;
        const insideSelectedTab = !!hostPane && hostPane.id === activePaneId;

    
        if (insideSelectedTab) {
            this.autosizeInput.resizeToFitContent(true);
        }
    }
}
