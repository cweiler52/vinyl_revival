// ANGULAR HELPERS //////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// MAIN STOREFRONT COMPONENTS //////////////////////////////////////////////////////////////////////
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ProductViewComponent } from './product-view/product-view.component';
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
  //{ path: 'profile', component: UserProfileComponent },
  // ADMIN PAGES
  { path: 'admin/products', component: AdminProdList },
  { path: 'admin/users', component: AdminUserlist }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// CONST RoutingComponents IS AN ARRAY OF IMPORTED COMPONENTS THAT WE CAN THEN ...
// IMPORT INTO app.module.ts AS ONE IMPORT & SET IN THE declarations OBJECT OF @NgModule
export const RoutingComponents = [ HomepageComponent, AboutComponent, ProductViewComponent, AdminProdList, AdminUserlist ];
