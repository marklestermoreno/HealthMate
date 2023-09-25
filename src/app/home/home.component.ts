import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

// Services

import { AssetsService } from '../services/assets.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    // Mobile Model Effects
    trigger('slideInFromBelow', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition(':enter', animate('800ms ease')),
      transition(':leave', animate('600ms ease'))
    ]),

    // Typing Effects
    trigger('typingEffect', [
      state('typing', style({
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      })),
      transition('* => typing', [
        style({ width: '0%', whiteSpace: 'nowrap', overflow: 'hidden', borderRight: 'none' }),
        animate('2s steps(40)', style({ width: '100%' })),
        animate('0.5s', style({ borderRight: 'none' }))
      ])
    ])
  ]

})
export class HomeComponent {

  assetsLoaded = false;
  assets: string[] = [];


  animationState = '';
  windowWidth: number = window.innerWidth;

  constructor(private route: ActivatedRoute,
    private assetsService: AssetsService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.assetsService.loadAssets()
      .then(loadedAssets => {
        this.assets = loadedAssets.map((a) => a.src);
        this.assetsLoaded = true;

        // Run change detection to update the view
        this.cdRef.detectChanges();
      })
      .catch(error => {
        console.error(error);
        // Handle error loading assets
      });
    setTimeout(() => {
      this.animationState = 'typing';
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

}
