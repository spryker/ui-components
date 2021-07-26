import { Observable } from 'rxjs';

export abstract class HtmlRendererProvider {
  abstract getHtml(): Observable<string>;
  abstract isLoading(): Observable<void>;
}
