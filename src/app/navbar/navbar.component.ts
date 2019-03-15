import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DatabaseService } from '../database.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginUserData = {}
  modalRef: BsModalRef;
  constructor(
    private dbService: DatabaseService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
  }

  openLogin() {
    this.modalRef = this.modalService.show(LoginComponent,  {
      initialState: {
        title: 'Login',
        data: {}
      }
    });
  }
  
  openSignup() {
  }  
  
  onLogin() {
    // console.log(this.loginUserData)
    this.dbService.loginUser(this.loginUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onLogout() {
    this.dbService.logoutUser()
  }

}
