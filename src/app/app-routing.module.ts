// ANGULAR HELPERS //////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// MAIN STOREFRONT COMPONENTS ///////////////////////////////////////////////////////////
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// ADMIN COMPONENT //////////////////////////////////////////////////////////////////////
import { AdminProdList } from './admin-prodlist/admin-prodlist.component';

const routes: Routes = [
  // MAIN STOREFRONT PAGES
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'record/:id', component: ProductViewComponent },
  // USER PROFILE PAGE
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard], data: ['user', 'admin'] },
  // ADMIN PAGES
  { path: 'admin/products', component: AdminProdList, canActivate: [AuthGuard], data: ['admin'] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// CONST RoutingComponents IS AN ARRAY OF IMPORTED COMPONENTS THAT WE CAN THEN ...
// IMPORT INTO app.module.ts AS ONE IMPORT & SET IN THE declarations OBJECT OF @NgModule
export const RoutingComponents = [ HomepageComponent, AboutComponent, ContactComponent, ProductViewComponent, UserProfileComponent, AdminProdList ];
