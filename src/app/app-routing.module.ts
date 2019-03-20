// ANGULAR HELPERS //////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';

// MAIN STOREFRONT COMPONENTS //////////////////////////////////////////////////////////////////////
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// ADMIN COMPONENTS //////////////////////////////////////////////////////////////////////

import { AdminProdList } from './admin-prodlist/admin-prodlist.component';
import { AdminUserlist } from './admin-userlist/admin-userlist.component';

const routes: Routes = [
  // MAIN STOREFRONT PAGES
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: AboutComponent },
  { path: 'record/:id', component: ProductViewComponent },
  // USER PROFILE PAGE
  { path: 'user/profile', component: UserProfileComponent },
  // ADMIN PAGES
  { path: 'admin/products', component: AdminProdList }, //, canActivate: [AuthGuard]
  { path: 'admin/users', component: AdminUserlist }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// CONST RoutingComponents IS AN ARRAY OF IMPORTED COMPONENTS THAT WE CAN THEN ...
// IMPORT INTO app.module.ts AS ONE IMPORT & SET IN THE declarations OBJECT OF @NgModule
export const RoutingComponents = [ HomepageComponent, AboutComponent, ProductViewComponent, UserProfileComponent, AdminProdList, AdminUserlist ];
