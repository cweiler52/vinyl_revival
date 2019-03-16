import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  title;
  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef) { }

  ngOnInit() {
  }
  
  onLogin() {
    // console.log(this.loginUserData)
    this.dbService.loginUser(this.loginUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
      this.closeModal();
  }

  closeModal(){
    this.modalRef.hide();
  }
}