import { ActiveToast } from 'ngx-toastr';
import { Observable } from 'rxjs';

export class NotificationRef {
    constructor(private activeToast: ActiveToast<any>) {}

    close(): void {
        this.activeToast.toastRef.close();
    }

    afterClose(): Observable<void> {
        return this.activeToast.onHidden;
    }
}
