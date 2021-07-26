import { Injectable } from '@angular/core';

import { InternalIconService } from './internal-icon.service';
import { IconSvg, IconServiceInterface } from './types';

@Injectable({ providedIn: 'root', useExisting: InternalIconService })
export abstract class IconService implements IconServiceInterface {
  abstract addIcon(name: string, svg: IconSvg): Promise<void>;
}
