import { Route, Router } from "@angular/router";
import { RestDataSource } from "../rest.datasource";
import { Injectable } from "@angular/core";
import { Role } from "../Role/Role.model";
import { Registration } from "./Registration.model";
import { BusinessRepository } from "../Business/business.repository";
import Swal from 'sweetalert2';

@Injectable()
export class RegistrationRepository{
  private registration?:Registration;
  private roles:Role[] = [];
  private status:string = "";
  private rId:any;

  constructor(private dataSource:RestDataSource,private roter:Router){
    dataSource.getRole().subscribe(data=>{
        this.roles = data;
    });
  }

  getRoles():Role[]{
    return this.roles;
  }

  saveRegistration(registration:Registration)
  {
    this.dataSource.saveRegistration(registration).subscribe(data=>{
      this.registration=data;
    });
    Swal.fire("Registartion Successfull !!","","success")
      this.roter.navigateByUrl("/welcome/home/login");
  }

  forgotPassword(registration:Registration)
  {
      this.dataSource.checkEmail(registration.email).subscribe(data=>{
        if(data.registerId==0)
        {
          this.registration=data;
          this.roter.navigateByUrl("/home/registration/signup");
        }
        else
        {
          registration.registerId=data.registerId;
          registration.roleId=data.roleId;
          this.dataSource.forgotPassword(registration).subscribe(data=>{
            this.registration=data;
            this.roter.navigateByUrl("/welcome/home/login");
          });
        }
      });
  }

  login(email:any,password:any)
  {
      return this.dataSource.login(email,password).subscribe(data=>{
        if(data!=null)
        {
          this.registration=data;
          this.rId =  this.registration.registerId;
          if(this.registration.roleId==1)
          {
            this.roter.navigateByUrl('/planner/'+this.rId+'/order');
          }
          else if(this.registration.roleId==2)
          {
            this.roter.navigateByUrl('/user/'+this.rId+'/home');
          }
          else if(this.registration.roleId==3)
          {
            this.roter.navigateByUrl("/admin");
          }
        }
        else
        {

          Swal.fire("Invalid Credentials","Try Again","error");
          this.roter.navigateByUrl("/home/login");
        }
    });
  }

  getRegisterId()
  {
    return this.registration?.registerId;
  }
}
