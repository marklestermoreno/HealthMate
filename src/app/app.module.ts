import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AppFeaturesComponent } from './app-features/app-features.component';
import { AboutUsComponent } from './about-us/about-us.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav'; // Import this

// Services
import { DrawerService } from './services/drawer.service';
import { AssetsService } from './services/assets.service';


@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    AppFeaturesComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [DrawerService, AssetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
