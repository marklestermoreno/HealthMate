import { Component, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';

// Import the AssetsService
import { AssetsService } from '../services/assets.service';

@Component({
  selector: 'AboutUs',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  assets: string[] = [];
  dataPaths: any;

  constructor(private assetsService: AssetsService, 
    private cdRef: ChangeDetectorRef,
    private router: Router
    ) { }

  ngOnInit() {
 
    // About US Assets
    this.assetsService.loadAboutUs()
      .then(results => {
        this.dataPaths = results.dataPaths;
        this.cdRef.detectChanges();

      })
      .catch(error => {
        console.error(error);
      });

    this.assetsService.loadAssets()
      .then(results => {
        this.assets = results.map(asset => asset.currentSrc);
        this.cdRef.detectChanges();
      })
      .catch(error => {
        console.error(error);
      });

  }

  navigateToFAQ() {
    // Use the router to navigate to another route
    this.router.navigate(['/faq']); // Replace 'another-route' with the actual route path
  }
  

}
  