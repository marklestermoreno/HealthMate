import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DrawerService } from './services/drawer.service';
import { AssetsService } from './services/assets.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ;
  isDrawerOpen = false;
  assetsLoaded = false;

  currentPath = '';

  constructor(
    private drawerService: DrawerService,
    private assetsService: AssetsService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });


    this.assetsService.loadAssets()
      .then(() => {
        this.assetsService.loadFeaturesAssets()
          .then(() => {
            this.assetsService.loadAboutUs()
              .then(() => {
                this.assetsLoaded = true;
              })
          })
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


  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToFAQ() {
    this.router.navigate(['/faq']);
  }

}
