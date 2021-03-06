import { Component, Input, Inject, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class CommentsComponent implements OnChanges {
  @Input() commentsArr: any;
  @Output() refreshComments = new EventEmitter();
  auth = this.dbService.getCookies();
  addOpen: boolean = false;
  commentView: boolean = false;
  editView: boolean = false;
  commentData: string;
  newComment: string;
  modalRef: BsModalRef;

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService, 
    @Inject(DOCUMENT) document) { }

  ngOnChanges() {
    this.getCommentsForAlbum()
    // console.log(this.commentCnt, this.commentsArr)
  }

  getCommentsForAlbum(){
    const pid: number = +this.route.snapshot.paramMap.get('id');
    this.dbService.getProductComments(pid).subscribe(
      data => {
        // console.log('comments for album', data);
        this.editView     = false;
        this.commentView  = false;
        this.commentsArr  = data;
      }
    )
  }

  editCheck(){
    return this.auth.user_id
  }
  
  editToggle(id){
    document.getElementById(`comment_edit_${id}`).classList.toggle('hidden');
  }
  
  viewToggle(){
    const _commentView = !this.commentView;
    this.commentView = _commentView
  }

  onCreate() {
    if(!this.auth.user_id){
      // pull up the login modal
      this.openSignup();
    }else{
      let uid: number = parseInt(this.auth.user_id);
      const pid = +this.route.snapshot.paramMap.get('id');
      // console.log(uid, pid, this.commentData);
      this.dbService.createComment(uid, pid, this.newComment)
        .subscribe(
          data => {
            // console.log('onCreate', data)
            this.refreshComments.emit(data)
          },
          err => console.log(err)
        )
    }
  }

  onEdit(id: number) {
    this.dbService.editComment(id, this.commentData)
      .subscribe(
        data => {
          // console.log('onEdit', data) 
          this.refreshComments.emit(data)
        },
        err => console.log(err)
      )
  }

  onDelete(id: number) {
  this.dbService.deleteComment(id)
    .subscribe(
      data => {
        // console.log('onDelete', data)
        this.refreshComments.emit(data)
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
