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
  commentsArr: any;
  modalRef: BsModalRef;
  auth = this.dbService.getCookies();
  addOpen: boolean = false;
  commentView: boolean = false;
  editView: boolean = false;
  commentData: string;
  style: string;

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
      this.dbService.favVinyl(this.auth.user_id, pid)
        .subscribe(
          data => { 
            console.log(data);
            this.newFavCnt = this.favCnt+1;
            console.log('newFavCnt: '+this.newFavCnt);
            document.getElementById('fav').innerHTML = `${this.newFavCnt}`;
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

  editCheck(){
      return this.auth.user_id
    }
    
    editToggle(id){
      document.getElementById(`comment_edit_${id}`).style.display = "block";
    }
    
    viewToggle(){
      const _commentView = !this.commentView;
      this.commentView = _commentView
    }

    onCreate() {
      const uid = this.auth.user_id;
      const pid = +this.route.snapshot.paramMap.get('id');
      this.dbService.createComment(parseInt(uid), pid, this.commentData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
    }

    onEdit(id: any) {
      this.dbService.editComment(id, this.commentData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
    }

    onDelete(id: any) {
    this.dbService.deleteComment(id)
      .subscribe(
        res => {
          document.getElementById(`comment_${id}`).style.display = "none";
          console.log(res)
          //this.dbService.getOneProduct(pid).subscribe(
            //data => {
                    //console.log(data);
             //     }
          //)
        },
        err => console.log(err),
      )
  }
  
  }
  // editCheck(){
  //   if (sessionStorage.uid !== this.auth.user_id){
  //     const editable = false
  //   }
  // };