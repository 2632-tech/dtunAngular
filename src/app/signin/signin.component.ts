import { Component, OnInit } from '@angular/core';
import{ HttpClient, HttpParams, HttpHeaders }from"@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    signinForm={
      email:'',
      password:''
    }
    email_err_msg=''
  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  ngOnInit(): void {
  }
  signin(){
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");
    const formData=this.signinForm;
    
    this.http.post('http://localhost:3000/session',formData,{ headers }).subscribe((data:any) =>  {
      console.log("Post call successful value returned in body", data);
      this.email_err_msg='';
      window.localStorage.setItem('auth_token',data.token);
      window.localStorage.setItem('user_info',JSON.stringify(data.user))
      this.router.navigate(['/']);

    },error=>{
       if(error.status=== 401){
        this.email_err_msg="登陆失败，邮箱不存在，或密码错误";
      }
    },()=>{
      console.log("The Post observable is now completed.");
    })

    
  }

}
