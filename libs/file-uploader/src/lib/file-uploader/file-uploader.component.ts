import { Component, Input, numberAttribute, booleanAttribute } from '@angular/core';
import { FileSizePipe } from './filesize.pipe';
import { HttpEventType } from '@angular/common/http';
import { FileUploaderService } from '../file-uploader.service';

@Component({
    standalone: false,
    selector: 'spy-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.less'],
    providers: [FileSizePipe],
})

export class FileUploaderComponent {
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() acceptedTypes: string = '';
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    @Input({ transform: booleanAttribute }) multiple: boolean = false;
    @Input({ transform: numberAttribute }) maxFileSize: number = 1024 * 1024 * 5;
    @Input({ transform: numberAttribute }) maxFilesNumber: number = 3;
    @Input() dragAndDropEnabled: boolean = false;
    @Input() sendUrl: string = '';
    @Input() title: string = '';
    @Input() subtitle: string = '';

    filesList: File[] = [];
    progress: number = 0;
    isDragOver: boolean = false;

    errors: string[] = [];

    constructor(
        private fileSizePipe: FileSizePipe,
        private uploadService: FileUploaderService) {}

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false;

        if (!this.dragAndDropEnabled || this.disabled) return;

        const files = event.dataTransfer?.files;
        if (files?.length) {
            this.onSelect(event, files);
        }
    }

    onSelect(event: Event, files: FileList): void {
        this.errors = [];
        this.filesList = this.multiple ? Array.from(files).slice(0, this.maxFilesNumber) : [files[0]];

        this.filesList.forEach(file => {
            if (file.size > this.maxFileSize) {
                this.errors.push(`File ${file.name} is too large. Maximum size is ${this.fileSizePipe.transform(this.maxFileSize)}.`);
            }
        });
    }

    uploadFiles(): void {
        if(this.errors.length) {
            return;
        }

        this.uploadService.uploadFiles(this.filesList, this.sendUrl)
        .subscribe({
            next: (event)=>{
                if(event.type === HttpEventType.UploadProgress && event.total) {
                    this.progress = Math.round((100*event.loaded) / event.total);
                }
                else {
                    this.handleSuccessResponse();
                }

            },
            error: (error)=>{
                this.handleErrorResponse(error);
            }
        });
    }

    handleSuccessResponse() {
        console.log('Upload complete');
    }

    handleErrorResponse(error: Error) {
        throw new Error(error.message);
    }

    deleteFile(file: any) {
        this.filesList = this.uploadService.deleteFile(this.filesList, file);
    }
}