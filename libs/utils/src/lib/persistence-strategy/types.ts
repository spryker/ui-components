import { Observable } from 'rxjs';

export interface PersistenceStrategy {
  save(key: string, value: unknown): Observable<void>;
  retrieve<T>(key: string): Observable<T | undefined>;
}
