import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginUserData: any;
  title: string;
  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  onSignup() {
    // console.log(this.loginUserData)
    this.dbService.SignupUser(this.loginUserData)
      .subscribe(
        res => { location.href = window.location.href },
        err => console.log(err)
      )
  }

  openLogin() {
    this.closeModal();
    this.modalRef = this.modalService.show(LoginComponent,  {
      initialState: {
        title: 'Login',
        loginUserData: {}
      }
    });
  }

  closeModal(){
    this.modalRef.hide();
  }

}