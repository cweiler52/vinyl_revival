import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent implements OnInit {
createData = {}
  constructor(
    private dbService: DatabaseService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  onDelete() {
    this.dbService.deleteVinyl(this.createData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

}
