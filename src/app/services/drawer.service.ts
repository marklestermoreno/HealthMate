import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private isDrawerOpenSubject = new BehaviorSubject<boolean>(false);
  isDrawerOpen$: Observable<boolean> = this.isDrawerOpenSubject.asObservable();

  toggleDrawer() {
    this.isDrawerOpenSubject.next(!this.isDrawerOpenSubject.value);
  }

  constructor() { }
}
