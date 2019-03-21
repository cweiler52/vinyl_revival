import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DatabaseService } from '../database.service';
import { ProductsFC } from '../models/products_favs_comments.model';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductViewComponent implements OnInit {
  product: ProductsFC;
  favCnt: number;
  newFavCnt: number;
  commentCnt: number;
  commentsArr: [];
  suggestions: [];
  modalRef: BsModalRef;
  auth = this.dbService.getCookies();

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.getOneProduct();
  }

  getOneProduct(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.dbService.getProdView(id).subscribe(
      data => {
        // console.log(data);
        this.favCnt = data.favs.length;
        this.commentCnt = data.comments.length;
        this.commentsArr = data.comments;
        this.product = data;
        // GET SUGGESTED ALBUMS
        this.dbService.getProdSuggestions(id, data.genre).subscribe(
          suggs => {
            // ORDER RESULTS BY FAVS COUNT & PAR DOWN TO 3
            this.suggestions = suggs.sort((a: any, b: any) => (a.favCount - b.favCount)).reverse().slice(0,3);
            // console.log(this.suggestions);
          })
      }
    )
  }

  onSuggestedClick(id){
    location.href = `/record/${id}`;
  }

  goBack(): void {
    this.location.back();
  }

  fav(): void {
    if(this.auth.is_loggedin){
      const pid: number = +this.route.snapshot.paramMap.get('id');
      // console.log(parseInt(this.auth.user_id), pid);
      this.dbService.favVinyl(parseInt(this.auth.user_id), pid)
        .subscribe(
          data => { 
            // console.log('add');
            // console.log(data);
            let fCnt = document.getElementById('fav').innerHTML;
            this.newFavCnt = parseInt(fCnt)+1;
            document.getElementById('fav').innerHTML = `${this.newFavCnt}`;
          },
          (err) => {
            if (err.error.name === "SequelizeUniqueConstraintError") { 
              this.dbService.favRemove(parseInt(this.auth.user_id), pid)
                .subscribe(
                  data => { 
                    // console.log('remove');
                    // console.log(data);
                    let fCnt = document.getElementById('fav').innerHTML;
                    this.newFavCnt = parseInt(fCnt)-1;
                    document.getElementById('fav').innerHTML = `${this.newFavCnt}`;
                  }
                )
            }else{
              console.log(err);
            }
          }
        );
    }else{
      // pull up the login modal
      this.openSignup();
    }
  }

  openSignup(): void {
    this.modalRef = this.modalService.show(SignupComponent,  {
      initialState: {
        title: 'Sign Up',
        loginUserData: {}
      }
    });
  }
}
