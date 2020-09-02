import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { IconArrowDownModule } from '@spryker/icon/icons';
import { PersistenceService, ToBoolean } from '@spryker/utils';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'spy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  @Input() width = 250;
  @Input() collapsedWidth = 62;
  @Input() trigger: undefined | TemplateRef<void>;
  @Input() @ToBoolean() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  private sidebarId = 'spy-sidebar-is-collapsed';
  arrowIcon = IconArrowDownModule.icon;

  collapsed$ = of(this.collapsed).pipe(
    switchMap(isCollapsed => {
      this.persistenceService.save(this.sidebarId, isCollapsed);

      return this.persistenceService.retrieve(this.sidebarId);
    }),
  );

  constructor(private persistenceService: PersistenceService) {}

  updateCollapse(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;
    this.persistenceService.save(this.sidebarId, this.isCollapsed());
    this.collapsedChange.emit(this.isCollapsed());
  }

  collapse(): void {
    this.collapsed = true;
    this.persistenceService.save(this.sidebarId, this.isCollapsed());
  }

  expand(): void {
    this.collapsed = false;
    this.persistenceService.save(this.sidebarId, this.isCollapsed());
  }

  toggle(): boolean {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }

    this.persistenceService.save('isCollapsed', this.isCollapsed());

    return this.isCollapsed();
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }
}
