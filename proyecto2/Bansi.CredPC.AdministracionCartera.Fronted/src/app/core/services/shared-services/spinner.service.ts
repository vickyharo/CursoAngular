import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoadingSubject.asObservable();

  show() {
    this.activeRequests++;
    setTimeout(() => this.isLoadingSubject.next(true), 0);
  }

  hide() {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    if (this.activeRequests === 0) {
      setTimeout(() => this.isLoadingSubject.next(false), 0);
    }
  }
}
