import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginUserData = {}
  constructor(private dbService: DatabaseService) { }

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