import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes =
  [
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'catalog', component: CatalogComponent },
    //{ path: '**', component: PageNotFoundComponent  }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
