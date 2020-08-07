import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export class NotificationRef {
  constructor(
    private activeToast: ActiveToast<any>,
    private toastrService: ToastrService,
  ) {}

  close(): void {
    console.log(this.activeToast);
    this.toastrService.remove(this.activeToast.toastId);
  }

  afterClose(): Observable<void> {
    return this.activeToast.onHidden;
  }
}
