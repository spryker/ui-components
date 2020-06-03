import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export class NotificationRef {
  constructor(
    private activeToast: ActiveToast<any>,
    private service: ToastrService,
  ) {}

  close(): void {
    this.service.remove(this.activeToast.toastId);
  }

  afterClose(): Observable<void> {
    return this.activeToast.onHidden;
  }
}
