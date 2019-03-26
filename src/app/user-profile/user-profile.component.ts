import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

import { Profile } from '../models/profile.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: Profile;
  auth = this.dbService.getCookies();
  modalRef: BsModalRef;
  profileData: any;
  
  constructor(
    private dbService: DatabaseService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.dbService.getUserProfile(parseInt(this.auth.user_id)).subscribe(
      data => {
        // console.log(data);
        this.profile = data;
      }
    )
  }

  openEdit() {
    this.dbService.getUserProfile(parseInt(this.auth.user_id)).subscribe(
      data => {
        this.profileData = data;
        console.log(data);
        this.openModal();
      }
    )
  }

  openModal() {
    this.modalRef = this.modalService.show(ProfileEditComponent,  {
      initialState: {
        title: 'Edit Profile',
        profileData: this.profileData
      }
    });
  }
}
