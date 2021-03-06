import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent implements OnInit {
  createData: any;

  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  onDelete(id: any) {
    this.dbService.deleteVinyl(id)
      .subscribe(
        res => {
          this.closeModal();
          location.href = window.location.href
        },
        err => console.log(err)
      )
  }

  closeModal(){
    this.modalRef.hide();
  }

}
