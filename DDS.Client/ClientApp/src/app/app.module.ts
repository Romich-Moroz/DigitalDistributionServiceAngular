import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { LibraryComponent } from './library/library.component';
import { RegistrationComponent } from './registration/registration.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { GamePreviewComponent } from './game-preview/game-preview.component';
import { DataService } from './data.service';
import { AdminComponent } from './admin/admin.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { UpdateReviewComponent } from './update-review/update-review.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CatalogComponent,
    CartComponent,
    AccountComponent,
    LibraryComponent,
    RegistrationComponent,
    RecoveryComponent,
    GamePreviewComponent,
    AdminComponent,
    UpdateGameComponent,
    UpdateReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
