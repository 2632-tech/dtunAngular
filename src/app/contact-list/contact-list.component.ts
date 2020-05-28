import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import{ HttpClient, HttpParams, HttpHeaders }from"@angular/common/http";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts=[]

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    // const token = window.localStorage.getItem('auth_token');
    // if(!token){
    //   this.router.navigate(['/signup'])
    // }
    // const params =new HttpParams({ fromObject: { _page:"1", _limit:"10"} });//方式三：使用 fromObject  //,{params}
    // const token = window.localStorage.getItem('auth_token') 
    // const headers =new HttpHeaders().set("X-Access-Token",token);//,{headers}
    this.getContacts()
  }
  getContacts(){

    this.http.get("http://localhost:3000/contacts").subscribe((data:any) =>  {
    this.contacts=data
    },error=>{
      window.alert("获取数据失败")
    },()=>{
      console.log("The Get observable is now completed.");
    })
  }

  deleteContactById(id,e){
    e.preventDefault()
    // console.log(id)
    if(!window.confirm('确定删除吗？')){
      return
    }
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");
    
    this.http.delete(`http://localhost:3000/contacts/${id}`,{ headers }).subscribe((data:any) =>  {
      // console.log(data)
      //重新请求数据
      this.getContacts();
    },error=>{
      console.warn("删除数据失败");
    },()=>{
      console.log("The Post observable is now completed.");
    })


  }


}
