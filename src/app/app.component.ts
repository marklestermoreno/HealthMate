import { Component, OnInit } from '@angular/core';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'healthmate_webapp';

  isDrawerOpen = false;

  constructor(private drawerService: DrawerService){}

  ngOnInit(): void {
   this.drawerService.isDrawerOpen$.subscribe(isOpen => {
     this.isDrawerOpen = isOpen;
   });
  }
  
}
