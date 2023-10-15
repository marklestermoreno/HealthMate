import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openModal(): void {
    this.dialog.open(ContactUsComponent, {
      maxWidth: "400px",
      minWidth: "300px",
      disableClose: true
    });
  }

  closeModal():void {
    this.dialog.closeAll();
  }
}
