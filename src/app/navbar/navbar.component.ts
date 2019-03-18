import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DatabaseService } from '../database.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  auth: Auth;
  modalRef: BsModalRef;

  constructor(
    private dbService: DatabaseService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.auth = this.dbService.getCookies();
  }

  openLogin() {
    this.modalRef = this.modalService.show(LoginComponent,  {
      initialState: {
        title: 'Login',
        loginUserData: {}
      }
    });
  }
  
  openSignup() {
    this.modalRef = this.modalService.show(SignupComponent,  {
      initialState: {
        title: 'Sign Up',
        loginUserData: {}
      }
    });
  }

  onLogout() {
    this.dbService.logoutUser();
    location.href = window.location.href;
  }

}
