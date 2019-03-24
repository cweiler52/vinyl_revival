import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileData: any;
  title: string;
  profile: Profile;
  auth = this.dbService.getCookies();

  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef,) { }

  ngOnInit() {
  }

  editProfile() {
    this.dbService.editProfile(parseInt(this.auth.user_id), this.profile).subscribe(
      data => {
        console.log(data);
        this.profile = data;
      }
    )
  }

}
