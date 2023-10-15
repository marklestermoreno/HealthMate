import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private isDrawerOpenSource = new BehaviorSubject<boolean>(false);
  isDrawerOpen$ = this.isDrawerOpenSource.asObservable();

  constructor() {}

  toggleDrawer() {
    this.isDrawerOpenSource.next(!this.isDrawerOpenSource.value);
  }

  closeDrawer() {
    this.isDrawerOpenSource.next(false);
  }
}
