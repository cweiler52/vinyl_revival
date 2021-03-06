import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  products: any;
  createData: any;
  title: string;
  // @Output() refresh = new EventEmitter();

  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
  }

  onCreate() {
    this.dbService.createVinyl(this.createData)
      .subscribe(
        res => {
          // console.log(res);
          this.closeModal();
          location.href = window.location.href
          // this.refresh.emit();
        },
        err => console.log(err)
      )
  }

  onEdit(id: any) {
    this.dbService.editVinyl(this.createData, id)
      .subscribe(
        res => {
          // console.log(res);
          this.closeModal();
          if(res){
            document.getElementById(`crud-action_${id}`).innerHTML = 'updated';
            setTimeout(() => {
              document.getElementById(`crud-action_${id}`).innerHTML = '';
            }, 2500);
            setTimeout(() => {
              location.href = window.location.href
              // this.refresh.emit();
            }, 2550);
          }
        },
        err => console.log(err)
      )
  }

  closeModal(){
    this.modalRef.hide();
  }

}
