import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Comments } from '../models/comments.model';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  comments: Comments;
  showComments: any;

  constructor(
    private dbService: DatabaseService,
    public modalRef: BsModalRef,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit() {
    
  }


  onDelete(id: any, pid: any) {
    this.dbService.deleteComment(id)
      .subscribe(
        res => {
          document.getElementById(`comment_${id}`).style.display = "none";
          this.dbService.getCommentsAdmin(pid).subscribe(
            data => {
              // console.log(data);
              if (data.length === 0){this.closeModal()}
            }
          )
        },
        err => console.log(err),
      )
  }

  closeModal(){
    this.modalRef.hide();
  }
}
