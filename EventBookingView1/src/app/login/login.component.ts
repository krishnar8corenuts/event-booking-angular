import { RegistrationRepository } from './../ModelRepository/Registration/registration.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public email?:string;
  public password?:string;

  submitted=false;

constructor(private formbuilder:FormBuilder,private router:Router,
  private registrationRepository:RegistrationRepository){

}

loginform=new FormGroup({
  vemail:new FormControl('',[Validators.required,Validators.email]),
  vpassword:new FormControl('',[Validators.required])
});

get validate()
{
  return this.loginform.controls;
}

  login(form:NgForm)
  {
      this.submitted=true;
      if(this.loginform.invalid)
      {
        return;
      }
      this.registrationRepository.login(this.email,this.password)
  }
}
