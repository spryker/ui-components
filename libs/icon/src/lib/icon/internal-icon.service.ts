import { Inject, Injectable, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { NzIconService } from 'ng-zorro-antd/icon';

import { ICONS_TOKEN } from './tokens';
import { IconSvg, IconServiceInterface } from './types';

/** @internal */
@Injectable({ providedIn: 'root' })
export class InternalIconService implements IconServiceInterface {
  private isInited = false;
  private resolvedIcons: Record<string, Promise<string> | undefined> = {};
  private unresolvedIcons: Record<string, IconSvg | undefined> = {};

  constructor(
    @Inject(ICONS_TOKEN)
    @Optional()
    private icons: InjectionTokenType<typeof ICONS_TOKEN> | null,
    private nzIcon: NzIconService,
  ) {}

  async addIcon(name: string, svg: IconSvg): Promise<void> {
    this.nzIcon.addIcon({
      name: name,
      theme: 'outline',
      icon: await this.getSvgIcon(name, svg),
    });
  }

  init(): void {
    if (this.isInited || !this.icons) {
      return;
    }
    this.isInited = true;

    this.icons
      .flat()
      .filter((icon) => !icon.forceInit)
      .forEach((icon) => (this.unresolvedIcons[icon.icon] = icon.svg));

    this.icons
      .flat()
      .filter((icon) => icon.forceInit)
      .forEach((icon) => this.addIcon(icon.icon, icon.svg));
  }

  async resolveIcon(name: string): Promise<string | undefined> {
    if (this.resolvedIcons[name]) {
      await this.resolvedIcons[name];
      return name;
    }

    if (this.unresolvedIcons[name]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await this.addIcon(name, this.unresolvedIcons[name]!);
      return name;
    }
  }

  private async getSvgIcon(name: string, svg: IconSvg): Promise<string> {
    const icon = typeof svg === 'string' ? Promise.resolve(svg) : svg();
    return await (this.resolvedIcons[name] = icon);
  }
}
