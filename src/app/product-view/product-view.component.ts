import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../database.service';



@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductViewComponent implements OnInit {
  product = {};
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getOneProduct(1);
  }

  getAllProducts() {
    this.dbService.getProductsHome().subscribe(
      data => { 
        console.log(data);
        this.product = data;
      }
      )
    }

    getOneProduct(id: any){
      this.dbService.getProdView(id).subscribe(
        data => {
          console.log(data);
          this.product = data;
        }
      )
    }
}
