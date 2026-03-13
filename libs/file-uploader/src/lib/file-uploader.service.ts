import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { from, map, mergeMap, Observable, filter } from 'rxjs';

export interface UploadStatus {
    file: File;
    progress: number;
    pending: boolean;
}

@Injectable({ providedIn: 'root' })
export class FileUploaderService {
    private http = inject(HttpClient);

    validateFileSize(files: File[], maxSize: number): string[] {
        return files.filter((file) => file.size > maxSize).map((file) => `File ${file.name} is too large.`);
    }

    uploadBatch(files: File[], url: string, batchSize: number): Observable<UploadStatus> {
        return from(files).pipe(mergeMap((file) => this.uploadWithProgress(file, url), batchSize));
    }

    private uploadWithProgress(file: File, url: string): Observable<UploadStatus> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(url, formData, { reportProgress: true, observe: 'events' }).pipe(
            filter((event) => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
            map((event) => {
                const progress =
                    event.type === HttpEventType.UploadProgress && event.total
                        ? Math.round((100 * event.loaded) / event.total)
                        : 100;
                return {
                    file,
                    progress,
                    pending: event.type !== HttpEventType.Response,
                };
            }),
        );
    }

    deleteFile(fileList: File[], file: File) {
        return fileList.filter((f) => f !== file);
    }
}
