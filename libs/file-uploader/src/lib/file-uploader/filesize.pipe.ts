import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filesize',
})
export class FileSizePipe implements PipeTransform {
    transform(bytes: number, decimals = 2) {
        if (isNaN(bytes) || bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        // To ensure up to 2 decimal places
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
        const unit = sizes[i];

        return `${formattedSize} ${unit}`;
    }
}
