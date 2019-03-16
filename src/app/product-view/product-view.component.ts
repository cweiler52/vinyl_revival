import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductViewComponent implements OnInit {
  product = {};
  favCnt: number;
  commentCnt: number;
  
  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getOneProduct();
  }

  getOneProduct(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.dbService.getProdView(id).subscribe(
      data => {
        console.log(data);
        this.favCnt = data.favs.length;
        this.commentCnt = data.comments.length;
        this.product = data;
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  fav(id): void {
    /* trigger sideview popout to show user's fav list */
    this.dbService.favVinyl(id)
      .subscribe();
  }
}
