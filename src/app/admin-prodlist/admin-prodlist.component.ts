import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminCreateComponent } from '../admin-create/admin-create.component';
//import { AdminEditComponent } from '../admin-edit/admin-edit.component';
//import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-prodlist',
  templateUrl: './admin-prodlist.component.html',
  styleUrls: ['./admin-prodlist.component.css']
})
export class AdminProdList implements OnInit {
  products = [];
  createData = {};
  //editData= {};
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
        console.log(data);
        this.products = data;
      }
    )
  }

  // getProduct(id: number) {
  //   this.dbService.getOneProduct(id).subscribe(
  //     data => {
  //       console.log(data);
  //       this.createData = data;
  //     }
  //   )
  // }

  openCreate(id: any) {
    
      if (id === undefined){
        this.title = 'Add Product'
        this.createData = {
          artist: null,
          album: null,
          cover: null,
          price: null,
          desc: null,
        }
        this.openModal()
      }
      else {
       this.title = 'Edit Product'
        this.dbService.getOneProduct(id).subscribe(
        data => {
                console.log(data);
                this.createData = data;
                this.openModal()
              }
      )
    }
  }
  
  openModal() {
    this.modalRef = this.modalService.show(AdminCreateComponent,  {
      initialState: {
        title: this.title,
        createData: this.createData
      }
    });
  }

  // openEdit() {
  //   this.modalRef = this.modalService.show(AdminEditComponent,  {
  //     initialState: {
  //       title: 'Edit Product',
  //       editData: {}
  //     }
  //   });
  // }

  

  onDelete() {

  }

}