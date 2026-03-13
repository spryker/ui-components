import { Component, Input, numberAttribute, booleanAttribute, inject, ViewChild } from '@angular/core';
import { FileSizePipe } from './filesize.pipe';
import { FileUploaderService } from '../file-uploader.service';
import { finalize } from 'rxjs';

@Component({
    standalone: false,
    selector: 'spy-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.less'],
    providers: [FileSizePipe],
})
export class FileUploaderComponent {
    @Input() name = '';
    @Input() id = '';
    @Input() acceptedTypes = '';
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) multiple = false;
    @Input({ transform: booleanAttribute }) showServiceNotes = true;
    @Input({ transform: numberAttribute }) maxFileSize = 1024 * 1024 * 5;
    @Input({ transform: numberAttribute }) maxFilesNumber = 5;
    @Input({ transform: numberAttribute }) batchSize = 2;
    @Input() dragAndDropEnabled = false;
    @Input() sendUrl = '';
    @Input() title = '';
    @Input() subtitle = '';
    @ViewChild('inputElement') inputElement!: any;

    private uploadService = inject(FileUploaderService);
    fileSizePipe = inject(FileSizePipe);

    filesList: File[] = [];
    fileProgress = new Map<File, number>();
    isDragOver = false;
    errors: string[] = [];

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

        if (this.multiple && files.length > this.maxFilesNumber) {
            const dataTransfer = new DataTransfer();
            this.filesList.forEach((file) => dataTransfer.items.add(file));
            this.inputElement.nativeElement.files = dataTransfer.files;
        }

        this.fileSizeCheck();
    }

    uploadFiles(): void {
        if (this.errors.length) return;

        this.uploadService
            .uploadBatch(this.filesList, this.sendUrl, this.batchSize)
            .pipe(finalize(() => this.resetErrors()))
            .subscribe({
                next: (status) => {
                    this.fileProgress.set(status.file, status.progress);
                    if (!status.pending) {
                        this.handleSuccessResponse();
                    }
                },
                error: (err) => this.handleErrorResponse(err),
            });
    }

    private fileSizeCheck(): void {
        this.errors = this.uploadService.validateFileSize(this.filesList, this.maxFileSize);
    }

    private handleSuccessResponse() {
        console.log('Upload complete');
    }

    private handleErrorResponse(error: Error) {
        throw new Error(error.message);
    }

    deleteFile(file: any) {
        this.filesList = this.uploadService.deleteFile(this.filesList, file);

        if (this.filesList.length === 0) {
            this.resetErrors();
        }
    }

    resetErrors() {
        this.errors = [];
    }
}
