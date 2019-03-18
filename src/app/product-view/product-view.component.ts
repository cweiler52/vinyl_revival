import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core'; // ViewChild, ElementRef, , ViewEncapsulation
import { ActivatedRoute } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DatabaseService } from '../database.service';
import { ProductsFC } from '../models/products_favs_comments.model';
import { SignupComponent } from '../signup/signup.component';
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
  //newFavCnt: number;
  commentCnt: number;
  commentsArr: [];
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
        console.log(data);
        this.favCnt = data.favs.length;
        this.commentCnt = data.comments.length;
        this.commentsArr = data.comments;
        this.product = data;
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  fav(): void {
    if(this.auth.is_loggedin){
      const pid = +this.route.snapshot.paramMap.get('id');
      /* trigger sideview popout to show user's fav list */
      this.dbService.favVinyl(this.auth.user_id, pid)
        .subscribe(
          data => { 
            console.log(data);
            //this.newFavCnt = this.favCnt++;
            document.getElementById('fav').innerHTML = `${this.favCnt++}`;
          },
          (err) => {
            if (err.error.message === "SequelizeUniqueConstraintError") { 
              alert('Nice! This album is already in your favs list!');
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
