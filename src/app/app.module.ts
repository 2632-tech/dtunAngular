import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignComponent } from './sign/sign.component';
import { SignupComponent } from './signup/signup.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagNewComponent } from './tag-new/tag-new.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { SigninComponent } from './signin/signin.component';
import { GlobalInterceptor } from './global.interceptor'
// 数据双向绑定
import { FormsModule } from '@angular/forms';


import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth-guard.service';
//0.路由模块初始化
// 1.配置路由
//    路由表：请求xxx路径的时候，导航到xxx组件
// 2.配置路由出口及路由导航链接
// 路由表
const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: '', 
    redirectTo: '/contacts',//当请求根路径的时候跳转到contacts联系人列表组件中
    pathMatch:'full' //必须完全匹配到路径的时候才做重定向
  },

  // 访问contacts会先把LayoutComponent组件渲染出来
  // 然后吧children中path为空的路由渲染到LayoutComponent组件中的路由出口
  { path: 'contacts', 
    component: LayoutComponent,
    canActivate:[AuthGuard], //在导航contacts之前会进入路由守卫
    children:[
      {
        path:'',
        component:ContactListComponent
      },
      {
        path:'new',//这里的new的请求路径是/contacts/new
        component:ContactNewComponent
      },
       {
        path:'edit/:id',//动态路径
        component:ContactEditComponent
      }
      
    ]
   },{ path: 'tags', 
    canActivate:[AuthGuard],
    component: LayoutComponent,
    children:[
      {
        path:'',
        component:TagListComponent
      },
      {
        path:'new',//这里的new的请求路径是/contacts/new
        component:TagNewComponent
      },
       {
        path:'edit',//这里的new的请求路径是/contacts/new
        component:TagEditComponent
      }
    ]
   },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SignComponent,
    SignupComponent,
    ContactListComponent,
    ContactNewComponent,
    ContactEditComponent,
    TagListComponent,
    TagNewComponent,
    TagEditComponent,
    SigninComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:GlobalInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
