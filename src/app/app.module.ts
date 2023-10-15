import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AppFeaturesComponent } from './app-features/app-features.component';
import { AboutUsComponent } from './about-us/about-us.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatDialogModule } from '@angular/material/dialog';

// Services
import { DrawerService } from './services/drawer.service';
import { AssetsService } from './services/assets.service';
import { ModalService } from './services/modal.service';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    AppFeaturesComponent,
    AboutUsComponent,
    FaqComponent,
    FooterComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DrawerService, AssetsService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
