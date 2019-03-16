import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginUserData = {}
  title;
  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  onSignup() {
    // console.log(this.loginUserData)
    this.dbService.SignupUser(this.loginUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }


}