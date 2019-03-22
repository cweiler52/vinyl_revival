import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [];
  favs = [];
  comments = [];
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.dbService.getProductsHome().subscribe(
      data => { 
        console.log(data);
        this.products = data;
      }
    )
  }
  
  // getAllFavs() {
  //   this.dbService.getFavsHome().subscribe(
  //     data => { 
  //       console.log(data);
  //       this.products = data;
  //     }
  //   )
  // }

  // getAllComments() {
  //   this.dbService.getCommentsHome().subscribe(
  //     data => { 
  //       console.log(data);
  //       this.products = data;
  //     }
  //   )
  // }  

}
