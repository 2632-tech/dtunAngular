import { Component, OnInit } from '@angular/core';
import{ HttpClient, HttpParams, HttpHeaders }from"@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = JSON.parse(window.localStorage.getItem('user_info') || '{}')

  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  ngOnInit(): void { 
  }
  siugnout(e){
    // 去除默认请求事件
    e.preventDefault()
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");;
    
    this.http.delete('http://localhost:3000/session',{ headers }).subscribe((data:any) =>  {
      console.log("Post call successful value returned in body", data);

      window.localStorage.removeItem('auth_token');
      this.router.navigate(['/signin']);

    },error=>{
      window.alert("退出失败")
    },()=>{
      console.log("The Post observable is now completed.");
    })
  }

}
