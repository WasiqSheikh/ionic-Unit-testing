import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  allComments:Comment[] = []
  text="";
  constructor(private commentsService:CommentsService){}

  ngOnInit(): void {
   this.loadComments()
  }

  handleChange(e:Event){
    this.text = (e.target as HTMLInputElement).value;
  }

  handleSubmit(){
    if(!this.text){
      alert("Please add a comment")
      return
    }
    this.commentsService.postComment({
      id: Date.now(),
      text:this.text
    }).subscribe((result:any)=>{
      this.allComments.push(result)
      this.text=""
    })
  }
  
  loadComments(){
    this.commentsService.getAllComments().subscribe((data: any)=>{
      this.allComments = data
    })
  }
}
