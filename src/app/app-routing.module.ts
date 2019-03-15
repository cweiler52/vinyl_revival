import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { About } from './about/about.component'
// import { ProductView } from './product-view/prouduct-view.component'

// import { AdminDashboard } from './admin-dashboard/admin-dashboard.component';
// import { AdminProducts } from './admin-prodview/admin-prodview.component';
// import { AdminUsers } from './admin-userlist/admin-userlist.component';

const routes: Routes = [
  // { path: 'about', component: About },
  // { path: 'productview', component: ProductView },
  
  // { path: 'admin/dashboard', component: AdminDashboard },
  // { path: 'admin/products', component: AdminProducts },
  // { path: 'admin/users', component: AdminUsers }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const RoutingComponents = [ AdminDashboard, AdminProducts, AdminUsers ];
