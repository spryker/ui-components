import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploaderService {
    constructor(private http: HttpClient){}

    uploadFiles(files: File[], sendUrl: string, extraData?: Record<string, any>): Observable<HttpEvent<any>> {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file))
        if (extraData) {
            Object.keys(extraData).forEach(key => formData.append(key, extraData[key]));
          }

          const req = new HttpRequest('POST', sendUrl, formData, {
            reportProgress: true,
            responseType: 'json',
          });

          return this.http.request(req);
    }

    deleteFile(fileList: File[], fileIndex: number) {
        return fileList.splice(fileIndex, 1);
    }
}
