import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor() { }

  loadAssets(): Observable<string[]> {
    const assets: string[] = [
      '../../assets/big_phone_home.png',
      '../../assets/small_phone_home.png'
    ]

    return of(assets);
  }
}
