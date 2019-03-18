import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
//  @Input() product: any;
//  constructor() { }
  
  createData = {}
  constructor(
    private dbService: DatabaseService,
    private modalRef: BsModalRef) { }

  ngOnInit() {
  }

  onCreate() {
    this.dbService.createVinyl(this.createData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onEdit(id: any) {
    this.dbService.editVinyl(this.createData, id)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  closeModal(){
    this.modalRef.hide();
  }

  // onDelete() {

  // }

}
