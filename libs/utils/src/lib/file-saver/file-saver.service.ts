import { Inject, Injectable } from '@angular/core';
import { WindowToken } from '../window-token';
import { InjectionTokenType } from '../types';

@Injectable({
    providedIn: 'root',
})
export class FileSaverService {
    constructor(
        @Inject(WindowToken)
        private windowToken: InjectionTokenType<typeof WindowToken>,
    ) {}

    fileSaver(blob: Blob, fileName: string): void {
        const link = this.windowToken.document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        this.windowToken.document.body.appendChild(link);
        link.click();

        this.windowToken.document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
