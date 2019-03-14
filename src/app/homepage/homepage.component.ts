import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
//import { LoginComponent } from '../login/login.component';
//import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  login = []
  // signup = []

  constructor( ) { }

  ngOnInit() {
  }

}
