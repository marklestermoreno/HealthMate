import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'FooterDetails',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private modalService: ModalService) {}

  openModal(): void {
    this.modalService.openModal();
  }
  
}
