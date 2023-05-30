import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { RegistrationRepository } from '../ModelRepository/Registration/registration.repository';
  import { Registration } from '../ModelRepository/Registration/Registration.model';
  import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';

  @Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
  })


  export class RegistrationComponent implements OnInit
  {
    submitted = false;
    submittedUser = false;
    public confimPassword?:string = "";
    public userconfimPassword?:string = "";
    registration:Registration = new Registration();
    public forgot:boolean = false;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    passwordmatch:boolean = false;
    userpasswordmatch:boolean=false;
    registrationForm:any = FormGroup;
    userregistrationForm:any = FormGroup;
    roleUser:boolean=true;
    rolePlanner:boolean=false;
    role:string='user'


    constructor(private router: Router,
                private registrationRepository:RegistrationRepository,
                private activeRoute:ActivatedRoute,
                private formBuilder:FormBuilder){
          this.forgot =activeRoute.snapshot.params["mode"]=="forgotpassword";
    }

    get validate()
    {
      return this.registrationForm.controls;
    }

    get userValidate()
    {
      return this.userregistrationForm.controls;
    }

    getRoleName(role:string){
    if(role==='user'){
      this.roleUser=true;
      this.rolePlanner=false;
    }
    else{
      this.roleUser=false;
      this.rolePlanner=true;
    }
      this.role=role;
    }

    ngOnInit(): void {
      this.registrationForm=this.formBuilder.group({
        vemail:['', [Validators.required,Validators.email]],
        vpassword:['',[Validators.required,Validators.pattern("^(?=.*?[a-z])(.{13,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12})$")]],
        vconfrimpassword: ['',[Validators.required]],
        vcontact:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
      });

      this.userregistrationForm=this.formBuilder.group({
        vuemail:['', [Validators.required,Validators.email]],
        vupassword:['',[Validators.required,Validators.pattern("^(?=.*?[a-z])(.{13,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12})$")]],
        vuconfrimpassword: ['',[Validators.required]],
      });
    }

    saveRegistration()
    {
      this.submitted=true;
      this.passwordmatch=false;
      if(this.registrationForm.invalid)
      {
        return;
      }
      if(this.confimPassword!=this.registration.password)
      {
        this.passwordmatch=true;
        return;
      }
      this.registration.roleId=2;
      this.registration.status='true';
        if(this.forgot)
        {
          this.registrationRepository.forgotPassword(this.registration);
        }
        else
        {
          this.registrationRepository.saveRegistration(this.registration);
        }
    }

    saveUserRegistration()
    {
      this.submittedUser=true;
      this.userpasswordmatch=false;
      if(this.userregistrationForm.invalid)
      {
        return;
      }
      if(this.userconfimPassword!=this.registration.password)
      {
        this.userpasswordmatch=true;
        return;
      }
      this.registration.roleId=2;
      this.registration.status='false';

        if(this.forgot)
        {
          this.registrationRepository.forgotPassword(this.registration);
        }
        else
        {
          this.registrationRepository.saveRegistration(this.registration);
        }
    }
  }
