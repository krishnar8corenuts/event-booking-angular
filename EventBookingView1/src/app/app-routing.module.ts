import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlannerComponent } from './planner/planner.component';
import { UserComponent } from './user/user.component';
import { BusinessComponent } from './business/business.component';
import { PostComponent } from './post/post.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './request/request.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UsereventComponent } from './userevent/userevent.component';
import { UserorderComponent } from './userorder/userorder.component';
import { AdminPlannerComponent } from './admin-planner/admin-planner.component';
import { AdminbookingComponent } from './adminbooking/adminbooking.component';


const routes: Routes = [
  {
    path:"welcome",component:AppComponent,
  },
  {
        path:"home",component:HomeComponent,
        children:[
        {path:"login",component:LoginComponent},
        {path:"registration/:mode",component:RegistrationComponent},
        {path:"**",redirectTo:"/login"},
        ],
  },
  {
        path:"planner",component:PlannerComponent,
        children:[
        {path:':id/bussiness',component:BusinessComponent},
        {path:':id/services',component:ServiceComponent},
        {path:':id/post',component:PostComponent},
        {path:':id/order',component:OrdersComponent},
        {path:'**',redirectTo:'/planner/:id/order'},
        ],
  },
  {
    path:"user",component:UserComponent,
    children:[
      {path:':id/home',component:UserHomeComponent},
      {path:':id/event',component:UsereventComponent},
      {path:':id/order',component:UserorderComponent},
      {path:'**',redirectTo:'/user/:id/order'},
      ],
  },
  {
    path:"admin",component:AdminComponent,
    children:[
      {path:'request',component:RequestComponent},
      {path:'planner',component:AdminPlannerComponent},
      {path:'booking',component:AdminbookingComponent},
      {path:'**',redirectTo:'/admin/request'}
    ],
  },
  {path:"**",redirectTo:'/home/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
