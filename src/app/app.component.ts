import { Component, OnInit } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { AssetsService } from './services/assets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
;
isDrawerOpen = false;
assetsLoaded = false;
  
  constructor(
    private drawerService: DrawerService, 
    private assetsService: AssetsService
    ) { }

  ngOnInit(): void {

    this.assetsService.loadAssets()
      .then(() => {
        this.assetsLoaded = true;
      })
      .catch(error => {
        console.error(error);
      });

    this.drawerService.isDrawerOpen$.subscribe(isOpen => {
      this.isDrawerOpen = isOpen;
    });
  }

}
