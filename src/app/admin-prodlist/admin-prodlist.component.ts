import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminCreateComponent } from '../admin-create/admin-create.component';


@Component({
  selector: 'app-admin-prodlist',
  templateUrl: './admin-prodlist.component.html',
  styleUrls: ['./admin-prodlist.component.css']
})
export class AdminProdList implements OnInit {
  products = [];
  createData = {};
  modalRef: BsModalRef;

  constructor(
    private dbService: DatabaseService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.dbService.getProducts().subscribe(
      data => { 
        console.log(data);
        this.products = data;
      }
    )
  }

  getProduct(id) {
    this.dbService.getOneProduct(id).subscribe(
      data => {
        console.log(data);
        this.createData = data;
      }
    )
  }

  openCreate() {
    this.modalRef = this.modalService.show(AdminCreateComponent,  {
      initialState: {
        title: 'Add Product',
        createData: {}
      }
    });
  }

  onEdit(id) {
    this.dbService.editVinyl(this.createData, id)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onDelete() {

  }

}