import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { ViewportScroller } from '@angular/common';
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
    private assetsService: AssetsService,
    private renderer: Renderer2, 
    private el: ElementRef, 
    private viewportScroller: ViewportScroller
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

  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }
  

}
