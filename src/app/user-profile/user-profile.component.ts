import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: Profile;
  auth = this.dbService.getCookies();
  
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.dbService.getUserProfile(this.auth.user_id).subscribe(
      data => {
        console.log(data);
        this.profile = data;
      }
    )
  }
}