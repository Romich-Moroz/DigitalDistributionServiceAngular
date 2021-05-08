import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { GameComponent } from './game/game.component';
import { LibraryComponent } from './library/library.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes =
  [
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'recovery', component: RecoveryComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: AccountComponent },
    { path: 'game', component: GameComponent },
    { path: 'library', component: LibraryComponent },
    //{ path: '**', component: PageNotFoundComponent  }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
