import { ResolveFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { AssetsService } from '../services/assets.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})

export const assetsResolver: ResolveFn<boolean> = (route, state) => {

  
  return true;
};
