// app-features.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { interval } from 'rxjs';

// Import the AssetsService
import { AssetsService } from '../services/assets.service';

@Component({
  selector: 'Features',
  templateUrl: './app-features.component.html',
  styleUrls: ['./app-features.component.scss'],
})
export class AppFeaturesComponent implements OnInit {

  assets: string[] = [];
  dataPaths: any;
  activeFeatureIndex: number | null = null;

  constructor(private assetsService: AssetsService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // Image Assets
    this.assetsService.loadAssets()
      .then(result => {
        this.assets = result.map(asset => asset.currentSrc);
        this.cdRef.detectChanges();
      })
      .catch(error => {
        console.error(error);
      });

    // Features Assets
    this.assetsService.loadFeaturesAssets()
      .then(results => {
        this.dataPaths = results.dataPaths;
        this.cdRef.detectChanges();
        interval(2000).subscribe(() => {
          this.changeActiveFeature();
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  showFeatureImage(feature: any): void {
    this.activeFeatureIndex = feature.id;
  }

  hideFeatureImage(): void {
    this.activeFeatureIndex = null;
  }

  changeActiveFeature(): void {
    const currentIndex = this.activeFeatureIndex !== null ? this.dataPaths.findIndex((feature: { id: number | null; }) => feature.id === this.activeFeatureIndex) : -1;
    const nextIndex = (currentIndex + 1) % this.dataPaths.length;
    this.activeFeatureIndex = this.dataPaths[nextIndex].id;
    this.cdRef.detectChanges(); // Trigger change detection after changing the active feature
  }

  setActiveFeature(featureId: number): void {
    this.activeFeatureIndex = featureId;
    this.cdRef.detectChanges();
  }

  getActiveAssetPath(): string | null {
    if (this.activeFeatureIndex !== null) {

      const activeFeature = this.dataPaths.find((feature: any) => feature.id === this.activeFeatureIndex);
      if (activeFeature) {
        return activeFeature.asset;
      }
    }
    return null;
  }
}
