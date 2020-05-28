import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import{ HttpClient, HttpParams, HttpHeaders }from"@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm={
    email:'',
    password:''
  }

  email_err_msg=''
  // 在组件中声明了一个私有成员http它的类型是HttpClient
  // 那么Anguar会自动去实例化http这个成员来调用一次请求方法了
  // 例如：http.get http.post...
  
  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  // private headers:HttpHeaders;
  // this.headers:HttpHeaders();
  // this.headers.set('Content-Type','application/json');

  ngOnInit(): void {
  }
  
  signup(){
    // 1.表单验证
    // 2.获取表单数据
    // 3.发起http请求和服务端交互
    // 4.根据响应结果做交互处理
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");
    const formData=this.signupForm;
    
    this.http.post('http://localhost:3000/users',formData,{ headers }).subscribe((data:any) =>  {
      console.log("Post call successful value returned in body", data);
      this.email_err_msg='';
      window.localStorage.setItem('auth_token',data.token);
       window.localStorage.setItem('user_info',JSON.stringify(data.user))
      this.router.navigate(['/']);

    },error=>{
       if(error.status=== 409){
        this.email_err_msg="邮箱已被占用";
      }
    },()=>{
      console.log("The Post observable is now completed.");
    })

    console.log('提交')
  }

}
