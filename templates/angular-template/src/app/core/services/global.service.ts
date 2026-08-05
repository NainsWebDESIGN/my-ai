import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  setLoading(val: boolean): void {
    this.loadingSubject.next(val);
  }

  showLoading(): void { this.setLoading(true); }
  hideLoading(): void { this.setLoading(false); }
}
