import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ButtonModule } from '@spryker/button';
import { FileSizePipe } from './file-uploader/filesize.pipe';
import { FileUploaderService } from './file-uploader.service';
import { I18nModule } from '@spryker/locale';

@NgModule({
    imports: [CommonModule, HttpClientModule, ButtonModule, FileSizePipe, I18nModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
    providers: [FileUploaderService],
})
export class FileUploaderModule {}
