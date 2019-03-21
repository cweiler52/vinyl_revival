// ANGULAR HELPERS //////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './guards/auth.guard';

// OUR COMPONENTS //////////////////////////////////////////////////////////////////////
import { ProductListComponent } from './product-list/product-list.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutingComponents } from './app-routing.module';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AdminCreateComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    RoutingComponents,
    AdminDeleteComponent,
    AdminCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule, 
    ModalModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [ LoginComponent, SignupComponent, AdminCreateComponent, AdminDeleteComponent, AdminCommentsComponent ] // THESE COMPONENTS POPULATE A MODAL
})

export class AppModule { }