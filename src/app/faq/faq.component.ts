import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AssetsService } from '../services/assets.service';
import { Router } from '@angular/router';


@Component({
  selector: 'FAQ',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
    trigger('fadeInOutHeaders', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
  ],
})
export class FaqComponent {

  faqData: any[] = [];
  assets: string[] = [];
  assetsLoaded = false;

  constructor(private assetsService: AssetsService, private router: Router) { }

  ngOnInit() {
    this.assetsService.loadFAQ().then(result => {
      this.faqData = result.dataPaths;
    });

    this.assetsService.loadAssets()
      .then(result => {
        this.assets = result.map(asset => asset.currentSrc);
        this.assetsLoaded = true;
      })
  }

  toggleAnswer(faq: any) {
    faq.showAnswer = !faq.showAnswer;
  }

  categorizeFaqs(): { [key: string]: any[] } {
    const categorizedFaqs: { [key: string]: any[] } = {};

    this.faqData.forEach((item) => {
      if (!categorizedFaqs[item.categoriesCode]) {
        categorizedFaqs[item.categoriesCode] = [];
      }
      categorizedFaqs[item.categoriesCode].push(item);
    });

    return categorizedFaqs;
  }

  correspondingCodes(codes: any) {

    switch (codes) {

      case "AR":
        return "Accounts and Registration";
      case "AF":
        return "Apps Features";
      case "PS":
        return "Privacy and Security";
      case "N":
        return "Notifications";
      case "T":
        return "Troubleshooting";
      case "C":
        return "Compatibility";
      case "FS":
        return "Feedback and Supports";
      case "DM":
        return "Data Management";
      case "GU":
        return "General Usage";

    }

    return "Other"
  }

  get uniqueCategories(): string[] {
    // Get unique category codes
    return Array.from(new Set(this.faqData.map((faq) => faq.categoriesCode)));
  }
  
  getFaqsForCategory(category: string): any[] {
    // Filter FAQs based on the category code
    return this.faqData.filter((faq) => faq.categoriesCode === category);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
