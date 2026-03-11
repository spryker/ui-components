import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploaderService {
    private http = inject(HttpClient);

    uploadFiles(files: File[], sendUrl: string, extraData?: Record<string, any>): Observable<HttpEvent<any>> {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        if (extraData) {
            Object.keys(extraData).forEach((key) => formData.append(key, extraData[key]));
        }

        const req = new HttpRequest('POST', sendUrl, formData, {
            reportProgress: true,
            responseType: 'json',
        });

        return this.http.request(req);
    }

    deleteFile(fileList: File[], file: File) {
        return fileList.filter((f) => f !== file);
    }
}
