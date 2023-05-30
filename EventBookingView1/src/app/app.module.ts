import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModelModule } from './ModelRepository/model.module';
import { LoginComponent } from './login/login.component';
import { PlannerComponent } from './planner/planner.component';
import { UserComponent } from './user/user.component';
import { BusinessComponent } from './business/business.component';
import { ServiceComponent } from './service/service.component';
import { PostComponent } from './post/post.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {MatToolbarModule} from '@angular/material/toolbar';
 import {MatIconModule} from '@angular/material/icon';
 import { MatButtonModule} from '@angular/material/button';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle';

 import { MatDialogModule} from '@angular/material/dialog';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './request/request.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UsereventComponent } from './userevent/userevent.component';
import { UserorderComponent } from './userorder/userorder.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { AdminPlannerComponent } from './admin-planner/admin-planner.component';
import { AdminbookingComponent } from './adminbooking/adminbooking.component';




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PlannerComponent,
    UserComponent,
    BusinessComponent,
    ServiceComponent,
    PostComponent,
    HomeComponent,
    SidebarComponent,
    OrdersComponent,
    AdminComponent,
    RequestComponent,
    UserHomeComponent,
    UsereventComponent,
    UserorderComponent,
    AdminPlannerComponent,
    AdminbookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModelModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
     MatToolbarModule,
     MatIconModule,
    MatButtonModule,
    MatDialogModule,
     MatFormFieldModule,
     MatInputModule,
    MatSelectModule,
ReactiveFormsModule,
MatCardModule,
MatChipsModule,
MatCardModule,
MatSlideToggleModule,
MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
