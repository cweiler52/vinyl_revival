import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin-prodlist',
  templateUrl: './admin-prodlist.component.html',
  styleUrls: ['./admin-prodlist.component.css']
})
export class AdminProdList implements OnInit {
  products = [];
  createData = {}

  constructor(private dbService: DatabaseService) { }

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
  }

  onCreate() {
    this.dbService.createVinyl(this.createData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
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