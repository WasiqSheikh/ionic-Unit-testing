import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let commentsService: jasmine.SpyObj<CommentsService>;
  let fixture: ComponentFixture<CommentComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const commentSpy = jasmine.createSpyObj("CommentsService", ["getAllComments", "postComment"])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CommentComponent],
      providers: [{ provide: CommentsService, useValue: commentSpy }]
    });

    commentsService = TestBed.inject(CommentsService) as jasmine.SpyObj<CommentsService>
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    //fixture.detectChanges();
  });

  it('should have buttons and input', () => {
    expect(el.query(By.css("h1")).nativeElement.innerText).withContext('Wrong Text').toBe("welcome to comments section")
    expect(el.query(By.css('input')).nativeElement).withContext('No Input tag present').toBeTruthy();
    expect(el.query(By.css('button')).nativeElement).withContext('No Button tag present').toBeTruthy();
  });

  it('should load all data on UI', () => {
    let comment = [{
      "id": "1",
      "text": "a comment about post 1"
    }, {
      "id": "2",
      "text": "another comment about post 1"
    }]
    commentsService.getAllComments.and.returnValue(of(comment));
    fixture.detectChanges();
    expect(el.queryAll(By.css('li')).length).toBe(2);
    // expect(component.allComments.length).toBe(2);
    // expect(component.allComments[0].text).toBe("a comment about post 1");
    // expect(component.allComments[1].text).toBe("another comment about post 1");
  });

  it('should show an alert box if the input text is clicked empty', () => {
    spyOn(window, 'alert');
    component.text = '';
    component.handleSubmit();
    expect(window.alert).toHaveBeenCalledOnceWith('Please add a comment');
    expect(commentsService.postComment).not.toHaveBeenCalled();
  });

  it('should add comment when user enters and input and clicks on post button', () => {
    let comment = {
      "id": 3,
      "text": "third comment"
    }
    commentsService.getAllComments.and.returnValue(of([]));
    fixture.detectChanges();

    commentsService.postComment.and.returnValue(of(comment));

    spyOn(Date, 'now').and.returnValue(3);

    //simulate user typing a comment

    let input: HTMLInputElement = el.query(By.css('input')).nativeElement;
    input.value = comment.text;
    input.dispatchEvent(new Event('input'));

    //Button Event for post

    let button: HTMLButtonElement = el.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(el.queryAll(By.css('li')).length).toBe(1);
    expect(el.queryAll(By.css('li'))[0].nativeElement.innerText).toBe(comment.text);
  })
});
