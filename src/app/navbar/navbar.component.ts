import { Component, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  
  openLogin() {
    this.dialog.open(LoginComponent)
  }

  openSignup() {
    this.dialog.open(SignupComponent)
  }

  ngOnInit() {
  }

}
