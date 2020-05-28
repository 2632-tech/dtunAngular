import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import{ HttpClient, HttpParams, HttpHeaders }from"@angular/common/http";

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  formData={
    name:'',
    email:'',
    phone:''
  }

  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  ngOnInit(): void {
  }
  addContact(){
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");
    const formData=this.formData;
    
    this.http.post('http://localhost:3000/contacts',formData,{ headers }).subscribe((data:any) =>  {
      console.log(data)
      this.router.navigate(['/']);

    },error=>{
      console.warn("新增数据失败");
      
    },()=>{
      console.log("The Post observable is now completed.");
    })

    console.log('提交')
  }

}
