import { HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CommentsService } from "./comments.service";
import { API_URL } from "../utils/resources";
import { firstValueFrom } from "rxjs";

let comments = [
  {
    "id": "1",
    "text": "a comment about post 1"
  },
  {
    "id": "2",
    "text": "another comment about post 1"
  },
  {
    "id": 1715333244678,
    "text": "third comment"
  },
  {
    "id": 1719300175605,
    "text": "fourth comment"
  }
]


describe('CommentsService', () => {
  let commentService: CommentsService;
  let httpTesting: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [
      //   CommentsService,
      //   provideHttpClientTesting(),
      //   provideHttpClient(withInterceptorsFromDi()),
      // ],
    });
    commentService = TestBed.inject(CommentsService);
    httpTesting = TestBed.inject(HttpTestingController);
  })

  it('should get all comments', () => {

    commentService.getAllComments().subscribe((comments: any) => {
      expect(comments).toBeTruthy();
      expect(comments.length).toBe(4);
    });

    const mockRequest = httpTesting.expectOne(`${API_URL}/comments`);
    mockRequest.flush(comments);
  })

  it('should get a comment by ID', () => {

    let dummyComment = comments[0];
    let id = 1;
    commentService.getCommentById(id).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
      expect(comment.text).toEqual("a comment about post 1");
    })

    const mockRequest = httpTesting.expectOne(`${API_URL}/comments/${id}`);
    mockRequest.flush(dummyComment);
  })

  it("should save a comment", () => {
    const saveComment = {
        id: 10,
        text: "Comment added by testing"
    }

    commentService.postComment(saveComment).subscribe((comment: any) => {
        expect(comment).toBeTruthy()
        expect(comment.text).toBe(saveComment.text)
    })

    const req = httpTesting.expectOne(`${API_URL}/comments`)
    expect(req.request.method).toEqual("POST");
    req.flush(saveComment)
})
it("should give error if save a comment fails", () => {
    const saveComment = {
        id: 11,
        text: "Comment added by testing"
    }

    commentService.postComment(saveComment).subscribe(
        {
            next: () => {
                fail("Save comment should have failed")
            },
            error:(err:HttpErrorResponse)=>{
                expect(err.status).toBe(500)
            }
        }
    )

    const req = httpTesting.expectOne(`${API_URL}/comments`)
    expect(req.request.method).toEqual("POST");
    req.flush("FAILED!!",{status:500,statusText:"Internal server error"})
})


  afterEach(() => {
    httpTesting.verify()
  })
})
