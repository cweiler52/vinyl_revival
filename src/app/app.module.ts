import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { HomepageComponent } from './homepage/homepage.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminProdviewComponent } from './admin-prodview/admin-prodview.component';
//import { AboutComponent } from './about/about.component';
import { RoutingComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    //HomepageComponent,
    ProductListComponent,
    AdminCreateComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AdminProdviewComponent,
    //AboutComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ LoginComponent, SignupComponent ]
})

export class AppModule { }