import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminCreateComponent } from '../admin-create/admin-create.component';
<<<<<<< HEAD
import { AdminDeleteComponent } from '../admin-delete/admin-delete.component';
//import { AdminEditComponent } from '../admin-edit/admin-edit.component';
//import { ActivatedRoute } from '@angular/router';
=======
>>>>>>> 3627e35122a3a1e28b2c3c68b353b0d913406210


@Component({
  selector: 'app-admin-prodlist',
  templateUrl: './admin-prodlist.component.html',
  styleUrls: ['./admin-prodlist.component.css']
})
export class AdminProdList implements OnInit {
  products = [];
  createData = {};
  modalRef: BsModalRef;
  title: string;

  constructor(
    private dbService: DatabaseService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.dbService.getProducts().subscribe(
      data => { 
        // console.log(data);
        this.products = data;
      }
    )
  }

  openCreate(id: any) {
    
      if (id === undefined){
        this.title = 'Add Product'
        this.createData = {
          album: null,
          artist: null,
          cover: null,
          desc: null,
          genre: null,
          price: null
        }
        this.openModal();

      } else {
        this.title = 'Edit Product'
        this.dbService.getOneProduct(id).subscribe(
        data => {
                // console.log(data);
                this.createData = data;
                this.openModal();
              }
        )
    }
  }
  
  openDelete(id: any) {
    this.dbService.getOneProduct(id).subscribe(
      data => {
              console.log(data);
              this.createData = data;
              this.openDeleteModal()
            }
    )
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(AdminDeleteComponent,  {
      initialState: {
        title: 'Delete this product?',
        createData: this.createData
      }
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(AdminCreateComponent,  {
      initialState: {
        title: this.title,
        createData: this.createData
      }
    });
  }

}