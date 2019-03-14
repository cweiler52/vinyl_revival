import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin-prodview',
  templateUrl: './admin-prodview.component.html',
  styleUrls: ['./admin-prodview.component.css']
})
export class AdminProdviewComponent implements OnInit {
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

  // onCreate() {
  //   this.dbService.createVinyl(this.createData)
  //     .subscribe(
  //       res => console.log(res),
  //       err => console.log(err)
  //     )
  // }

  // onEdit(id: any) {
  //   this.dbService.editVinyl(id)
  //     .subscribe(
  //       res => console.log(res),
  //       err => console.log(err)
  //     )
  // }

  // onDelete() {

  // }

}
