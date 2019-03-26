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

  deleteToggle() {
    document.getElementById(`deleter`).style.display = "block";

  }

  deleteProfile() {
    this.dbService.deleteProfile(parseInt(this.auth.user_id))
      .subscribe(
        res => {
          this.closeModal();
          location.href = window.location.href},
        err => console.log(err) 
      )
  }

  editProfile() {
    this.dbService.editProfile(parseInt(this.auth.user_id), this.profileData.user).subscribe(
      data => {
        console.log(data);
        this.profile = data;
        location.href = window.location.href},
        err => console.log(err)
    )
  }

  closeModal(){
    this.modalRef.hide();
  }

}
