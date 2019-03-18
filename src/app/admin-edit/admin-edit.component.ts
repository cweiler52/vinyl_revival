import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  @Input() product: any;
  editData = {}

  constructor(
    private dbService: DatabaseService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {

  }
  
  onEdit(id: any) {
    this.dbService.editVinyl(this.editData, id)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  closeModal(){
    this.modalRef.hide();
  }
}
