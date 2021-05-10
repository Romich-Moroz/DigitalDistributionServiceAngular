import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthenticationComponent } from './components/auth/authentication/authentication.component';
import { RecoveryComponent } from './components/auth/recovery/recovery.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LibraryComponent } from './components/library/library.component';

const routes: Routes =

  [
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'recovery', component: RecoveryComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: AccountComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'admin', component: AdminComponent },
    //{ path: '**', component: PageNotFoundComponent  }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
