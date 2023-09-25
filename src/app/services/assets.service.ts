// assets.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor() { }

  loadAssets(): Promise<HTMLImageElement[]> {
    const assetPaths = [
      '../../assets/big_phone_home.png',
      '../../assets/small_phone_home.png'
    ];

    return Promise.all(assetPaths.map(path => this.loadImage(path)));
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
