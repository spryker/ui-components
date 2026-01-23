import { Component, Input, numberAttribute, booleanAttribute } from '@angular/core';
import { ButtonComponent } from '@spryker/button';
import { FileSizePipe } from './filesize.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: false,
    selector: 'spy-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.less'],
    providers: [FileSizePipe],
})

export class FileUploaderComponent {
    @Input() acceptedTypes: string = '';
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    @Input({ transform: booleanAttribute }) multiple: boolean = false;
    @Input({ transform: numberAttribute }) maxFileSize: number = 1024 * 1024 * 5;
    @Input({ transform: numberAttribute }) maxFilesNumber: number = 3;
    @Input() sendUrl: string = 'http://localhost:4400/';

    files: File[] = [];

    errors: string[] = [];

    constructor(private fileSizePipe: FileSizePipe, private http: HttpClient) {

    }

    onSelect(event: Event, files: FileList): void {
        this.errors = [];
        this.files = this.multiple ? Array.from(files).slice(0, this.maxFilesNumber) : [files[0]];

        this.files.forEach(file => {
            if (file.size > this.maxFileSize) {
                this.errors.push(`File ${file.name} is too large. Maximum size is ${this.fileSizePipe.transform(this.maxFileSize)}.`);
            }
        });
    }

    uploadFiles(): void {
        if(this.errors.length) {
            return;
        }

        const formData = new FormData();
        this.files.forEach(file => formData.append('files', file))
        this.http.post(this.sendUrl, formData).subscribe({
            next: (response) => console.log('Upload successful', response),
            error: (error) => console.error('Upload failed', error)
          });;
    }
}