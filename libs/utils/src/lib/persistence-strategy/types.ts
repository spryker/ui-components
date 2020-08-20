import { Observable } from 'rxjs';

export interface PersistenceStrategy {
  save(key: string, value: unknown): Observable<void>;
  retrieve(key: string): Observable<unknown>;
}
