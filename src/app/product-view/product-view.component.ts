import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../database.service';
import { ProductsFC } from '../models/products_favs_comments.model';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductViewComponent implements OnInit {
  product: ProductsFC;
  favCnt: number;
  commentCnt: number;
  commentsArr: [];
  auth: Auth;


  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getOneProduct();
    this.auth = this.dbService.getCookies();
  }

  getOneProduct(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.dbService.getProdView(id).subscribe(
      data => this.product = data
      // data => {
      //   console.log(data);
      //   this.favCnt = data.favs.length;
      //   this.commentCnt = data.comments.length;
      //   this.commentsArr = data.comments;
      //   this.product = data;
      // }
    )
  }

  goBack(): void {
    this.location.back();
  }

  fav(): void {
    if(this.auth.is_loggedin){
      const pid = +this.route.snapshot.paramMap.get('id');
      /* trigger sideview popout to show user's fav list */
      this.dbService.favVinyl(this.auth.user_id, pid).subscribe(data => { console.log(data); } );
    }else{
      // pull up the login modal
      console.log('pull up the login modal');
    }
  }
}
