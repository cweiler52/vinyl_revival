import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DatabaseService } from '../database.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() commentCnt: number;
  @Input() commentsArr: any;
  
  @Output() refreshComments = new EventEmitter();
  auth = this.dbService.getCookies();
  addOpen: boolean = false;
  commentView: boolean = false;
  editView: boolean = false;
  commentData: string;
  modalRef: BsModalRef;

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService) { }

  ngOnInit() {
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
    let uid: number = 0;
    if(!this.auth.user_id){
      // pull up the login modal
      this.openSignup();
    }else{
      uid = parseInt(this.auth.user_id);
    }
    const pid = +this.route.snapshot.paramMap.get('id');
    console.log(uid, pid, this.commentData);
    this.dbService.createComment(uid, pid, this.commentData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onEdit(id: number) {
    this.dbService.editComment(id, this.commentData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onDelete(id: number) {
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

  openSignup(): void {
    this.modalRef = this.modalService.show(SignupComponent,  {
      initialState: {
        title: 'Sign Up',
        loginUserData: {}
      }
    });
  }
}
