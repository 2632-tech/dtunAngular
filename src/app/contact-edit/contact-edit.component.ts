import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import{ HttpClient, HttpParams, HttpHeaders }from"@angular/common/http";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  formData={
    name:'',
    email:'',
    phone:'',
    id:0
  }
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    // 如何获取路径动态参数
    // console.log(this.route)
    const contactId = this.route.snapshot.params.id
    this.getContactById(contactId)
    console.log(contactId);
  }
  getContactById(id){
    // e.preventDefault()
    // console.log(id)
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");
    
    this.http.get(`http://localhost:3000/contacts/${id}`,{ headers }).subscribe((data:any) =>  {
      
      this.formData=data
      console.log(data);
      

    },error=>{
      console.warn("获取数据失败");
    },()=>{
      console.log("The Post observable is now completed.");
    })

  }
  editContact(){
    const headers =new HttpHeaders().set("Content-type","application/json; charset=UTF-8");
    const id = this.formData.id

    this.http.patch(`http://localhost:3000/contacts/${id}`,this.formData,{ headers }).subscribe(data =>  {

      // this.router.navigate([/contacts]);
      this.router.navigate(['/']);

    },error=>{
      console.warn("修改数据失败");
    },()=>{
      console.log("The Post observable is now completed.");
    })

  }    

}
