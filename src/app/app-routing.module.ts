import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component'

import { AdminProdList } from './admin-prodlist/admin-prodlist.component';
import { AdminUserlist } from './admin-userlist/admin-userlist.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: AboutComponent },

  { path: 'admin/products', component: AdminProdList },
  { path: 'admin/users', component: AdminUserlist }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [ HomepageComponent, AboutComponent, AdminProdList, AdminUserlist ];
