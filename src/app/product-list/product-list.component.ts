import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;
  p: number;
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getAllProducts('album');
  }

  getAllProducts(sort) {
    let qsort = sort ? sort : 'album';
    this.dbService.getProductsHome(qsort).subscribe(
      data => { 
        //console.log(data);
        this.products = data;
      }
    )
  }  

}
