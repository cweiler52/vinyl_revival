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
  auth = {};

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
      data => {
        console.log(data);
        // this.favCnt = data.favs.length;
        // this.commentCnt = data.comments.length;
        this.product = data;
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  fav(): void {
    // console.log('auth.is_loggedin: '+this.auth.is_loggedin);
    // if(this.auth.is_loggedin){
    //   const pid = +this.route.snapshot.paramMap.get('id');
    //   /* trigger sideview popout to show user's fav list */
    //   console.log('user_id: '+this.auth.user_id+' | product_id: '+pid);
    //   this.dbService.favVinyl(this.auth.user_id, pid).subscribe(data => { console.log(data); } );
    // }else{
    //   // pull up the login modal
    //   console.log('pull up the login modal');
    // }
  }
}
