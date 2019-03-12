import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginUserData = {}
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
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