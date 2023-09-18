import { Component} from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'TopNav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {

  isDrawerOpen = false;

  constructor(private drawerService: DrawerService) {}

  toggleDrawer() {
    this.isDrawerOpen = true;
    this.drawerService.toggleDrawer();
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.drawerService.toggleDrawer();
  }
}
