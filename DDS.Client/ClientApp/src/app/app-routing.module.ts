import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateGameComponent } from './components/admin/update-game/update-game.component';
import { UpdateGenresComponent } from './components/admin/update-genres/update-genres.component';
import { AuthenticationComponent } from './components/auth/authentication/authentication.component';
import { RecoveryComponent } from './components/auth/recovery/recovery.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LibraryComponent } from './components/library/library.component';
import { UpdateReviewComponent } from './components/library/update-review/update-review.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { UserGuard } from './guards/user/user.guard';

const routes: Routes =

  [
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'recovery', component: RecoveryComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
    { path: 'account', component: AccountComponent, canActivate: [UserGuard] },
    { path: 'library', component: LibraryComponent, canActivate: [UserGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'update-genres', component: UpdateGenresComponent, canActivate: [AdminGuard] },
    { path: 'update-game/:id', component: UpdateGameComponent, canActivate: [AdminGuard] },
    { path: 'update-review/:id', component: UpdateReviewComponent, canActivate: [UserGuard] },
    { path: 'reviews/:id', component: ReviewsComponent },
    //{ path: '**', component: PageNotFoundComponent  }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
