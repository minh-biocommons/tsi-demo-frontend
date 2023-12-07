import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private subject = new Subject<string>();

  constructor() { }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.subject.next(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.subject.next(key);
  }

  getItemValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  getLocalStorageChanges(): Observable<string> {
    return this.subject.asObservable();
  }
}
