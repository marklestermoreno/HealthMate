// assets.service.ts
import { Injectable } from '@angular/core';
import { features } from 'src/data/featuring-data';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor() { }

  loadAssets(): Promise<HTMLImageElement[]> {
    const assetPaths = [
      '../../assets/big_phone_home.png',
      '../../assets/small_phone_home.png',
      '../../assets/phone_model.png'
    ];
  
    return Promise.all(
        assetPaths.map(path => this.loadImage(path)),
      );
  }

  loadFeaturesAssets(): Promise<{ dataPaths: { id: number, name: string, description: string, asset: HTMLImageElement }[] }> {
    const featurePaths = features.map(feature => feature.assetPath);
    return Promise.all(
      featurePaths.map(path => this.loadImage(path)),
    ).then(assets => {
      const dataPaths = features.map((feature, index) => ({
        ...feature,
        asset: assets[index]
      }));

      return { assets, dataPaths };
    });
  }

  private loadImage(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load asset: ${path}`);
    });
  }
}
