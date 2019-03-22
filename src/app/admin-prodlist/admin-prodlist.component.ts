import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminCreateComponent } from '../admin-create/admin-create.component';
import { AdminDeleteComponent } from '../admin-delete/admin-delete.component';
import { AdminCommentsComponent } from '../admin-comments/admin-comments.component';

@Component({
  selector: 'app-admin-prodlist',
  templateUrl: './admin-prodlist.component.html',
  styleUrls: ['./admin-prodlist.component.css']
})
export class AdminProdList implements OnInit {
  products: any;
  createData = {};
  modalRef: BsModalRef;
  title: string;
  // comments: [];
  showComments: any;

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
              this.openDeleteModal(id)
            }
    )
  }

  openDeleteModal(id) {
    this.modalRef = this.modalService.show(AdminDeleteComponent,  {
      initialState: {
        title: 'Delete this product?',
        createData: this.createData,
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


  getComments(id: any) {
    this.dbService.getCommentsAdmin(id).subscribe(
      data => {
              console.log(data);
              //this.commentCnt = data.comments.length;
              this.showComments = data;
              this.openComments()
            }
    )
  }

  openComments() {
    this.modalRef = this.modalService.show(AdminCommentsComponent,  {
      initialState: {
        title: 'View Comments',
        showComments: this.showComments
      }
    });
  }

}