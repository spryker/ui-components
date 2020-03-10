import { Injectable, InjectionToken, Inject, Provider } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

export type SvgPromise = () => Promise<string>;

export interface AddIcon {
  addIcon(name: string, svg: string | SvgPromise): void;
  _init(): void;
}

export interface Icon {
  icon: string;
  svg: string | SvgPromise;
}

export function tokenFactory() {
  return [];
}

export const ICONS_TOKEN = new InjectionToken<Icon[][]>('ICONS_TOKEN', {
  providedIn: 'root',
  factory: tokenFactory,
});

export function provideIcons(icons: Icon[]): Provider {
  return {
    provide: ICONS_TOKEN,
    useValue: icons,
    multi: true,
  };
}

@Injectable({ providedIn: 'root' })
export class IconService implements AddIcon {
  resolvedIcons: Record<string, Promise<string> | undefined> = {};
  isInited = false;

  constructor(
    @Inject(ICONS_TOKEN) private icons: Icon[][],
    private nzIcon: NzIconService,
  ) {}

  _init(): void {
    if (this.isInited) {
      return;
    }
    this.isInited = true;

    this.icons.flat().forEach((icon: Icon) => {
      this.addIcon(icon.icon, icon.svg);
    });
  }

  private async getSvgIcon(
    name: string,
    svg: string | SvgPromise,
  ): Promise<string> {
    const icon = typeof svg === 'string' ? Promise.resolve(svg) : svg();
    return await (this.resolvedIcons[name] = icon);
  }

  async addIcon(name: string, svg: string | SvgPromise): Promise<void> {
    this.nzIcon.addIcon({
      name: name,
      theme: 'outline',
      icon: await this.getSvgIcon(name, svg),
    });
  }

  async resolveIcon(name: string): Promise<string | undefined> {
    if (this.resolvedIcons[name]) {
      await this.resolvedIcons[name];
      return name;
    }
  }
}
