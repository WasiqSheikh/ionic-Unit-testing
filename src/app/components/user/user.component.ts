import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username = ""
  phone = 1234567890
  status = "Single"

  showUserName(){
  //  setTimeout(()=>{
  //    this.username = "Edward Lewis"
  //  },1000)

  //  Promise.resolve().then(()=>{
  //    this.username = "Edward Lewis"
  //  })

   ajax("https://jsonplaceholder.typicode.com/users")
   .subscribe((data:any)=>{
     this.username = data.response[0].name
   })


  }
}
