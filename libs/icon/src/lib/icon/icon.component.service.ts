import { Injectable, InjectionToken, Inject } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

export type SvgPromise = () => Promise<string>;

export interface AddIcon {
  addIcon(name: string, svg: string | SvgPromise): void;
  _init(): void;
}

export interface Icon {
  name: string;
  svg: string | SvgPromise;
}

export const ICONS_TOKEN = new InjectionToken<Icon[]>('ICONS_TOKEN', {
  providedIn: 'root',
  factory: function() { return [] },
});

@Injectable({ providedIn: 'root' })
export class IconService implements AddIcon {
  resolvedIcons: { [key: string]: Promise<string> } = {};
  isInited = false;

  constructor(
    @Inject(ICONS_TOKEN) private icons: Icon[],
    private nzIcon: NzIconService,
  ) {}

  _init(): void {
    if (this.isInited) {
      return;
    }

    this.icons.forEach((icon: Icon) => {
      this.addIcon(icon.name, icon.svg);
    });

    this.isInited = true;
  }

  private async getSvgIcon(
    name: string,
    svg: string | SvgPromise,
  ): Promise<string> {
    if (typeof svg === 'string') {
      return svg;
    }

    this.resolvedIcons[name] = svg();
    return await this.resolvedIcons[name];
  }

  async addIcon(name: string, svg: string | SvgPromise): Promise<void> {
    this.nzIcon.addIcon({
      name: name,
      theme: 'outline',
      icon: await this.getSvgIcon(name, svg),
    });
  }

  resolveIcon(name: string): Promise<string> {
    if (this.resolvedIcons[name]) {
      return this.resolvedIcons[name].then(() => name);
    }

    return new Promise(resolve => resolve(name));
  }
}
