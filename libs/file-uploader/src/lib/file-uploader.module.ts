import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ButtonModule } from '@spryker/button';
import { FileSizePipe } from './file-uploader/filesize.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, ButtonModule, FileSizePipe, HttpClientModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
})
export class FileUploaderModule {}
