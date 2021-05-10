import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './components/auth/authentication/authentication.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { LibraryComponent } from './components/library/library.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { RecoveryComponent } from './components/auth/recovery/recovery.component';
import { GamePreviewComponent } from './components/small-components/game-preview/game-preview.component';
import { DataService } from './services/data.service';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateReviewComponent } from './components/admin/update-review/update-review.component';
import { UpdateGameComponent } from './components/admin/update-game/update-game.component';
import { UpdateGenresComponent } from './components/admin/update-genres/update-genres.component';

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
    UpdateReviewComponent,
    UpdateGenresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
