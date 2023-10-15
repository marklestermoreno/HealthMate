import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'TopNav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  isDrawerOpen = false;

  constructor(private drawerService: DrawerService, private router: Router) {}

  ngOnInit() {
    this.drawerService.isDrawerOpen$.subscribe(isOpen => {
      this.isDrawerOpen = isOpen;
    });
  }

  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  closeDrawer() {
    this.drawerService.closeDrawer();
  }

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    this.closeDrawer(); // Close the drawer after navigation
  }

  navigateToFAQ() {
    this.router.navigate(['/faq']);
    this.closeDrawer(); // Close the drawer after navigation
  }
  
  navigateToHome() {
    this.router.navigate(['/home']);
    this.closeDrawer(); // Close the drawer after navigation
  }
}
