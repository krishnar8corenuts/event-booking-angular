import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Business } from './../ModelRepository/Business/buiness.model';
import { BusinessRepository } from './../ModelRepository/Business/business.repository';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RestDataSource } from '../ModelRepository/rest.datasource';
import { City } from '../ModelRepository/Business/city.model';
import { UserEventRepository } from '../ModelRepository/userEvent/userevent.repository';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  bussinessForm!: FormGroup;
  public stateId?:number;
  public cityId?:any;
  public business?:Business;
  public submitted:boolean = false;
  public registerId?:number | undefined;
  public status?:boolean;
  file?: any;
  imageId?:number;
  public show?:boolean = true;
  profileBusiness?:Business;
  businesses: Business[] | undefined;
  public edit:boolean = false;
  cities:City[]=[]
  public city?:City;
  imagePath?:any;


  constructor(private businessRepository:BusinessRepository,private formBuilder:FormBuilder,
    private activeRoute:ActivatedRoute,private restData:RestDataSource,
    private userEventRepository:UserEventRepository)
    {
      this.registerId=this.activeRoute.snapshot.params['id'];
      this.getBusiness();
    }

  ngOnInit(): void {
   this.bussinessForm= this.formBuilder.group({
      stateId:(''),
      businessName:(''),
      cityId:(''),
      pincode:(''),
      description:(''),
    });
  }

  back()
  {
    this.show=!this.show;
  }

  getState()
  {
    return this.businessRepository.getState();
  }

  getCity()
  {

    return this.businessRepository.getCity(this.stateId);
  }

 getBusiness()
  {
    this.restData.getBusiness().subscribe(data=>{
    this.businesses=data;
    this.profileBusiness = this.businesses.filter(c=>c.registerId==this.registerId)[0]
    if(this.profileBusiness != undefined)
    {
      this.restData.getImage(this.profileBusiness.imageId).subscribe(data=>{
        this.imagePath=environment.getUrl('image')+"api/image/get/"+data.imageName;
      });
      this.show=true;
    }
    else
     this.show=false;
    });
    this.restData.getCity().subscribe(data=>{
      this.cities=data;
      this.city = this.cities.filter(b=>b.cityId==this.profileBusiness!.cityId)[0];
    });
  }

  editBusiness()
  {
    this.show=false;
    this.bussinessForm.controls["businessName"].setValue(this.profileBusiness!.businessName);
    this.restData.getCity().subscribe(data=>{
    this.cities=data;
    this.city = this.cities.filter(b=>b.cityId==this.profileBusiness!.cityId)[0];
    this.bussinessForm.controls["pincode"].setValue(this.profileBusiness!.pincode)
    this.bussinessForm.controls["description"].setValue(this.profileBusiness!.description)
    this.bussinessForm.controls["stateId"].setValue(this.city?.stateId);
    this.bussinessForm.get('cityId')?.setValue(this.city.cityName);
   })
  }

  saveBusiness()
  {
    this.business=this.bussinessForm.value;
    if(this.business != undefined)
    {
      this.business.registerId=this.registerId;
    }
    this.businessRepository.saveImage(this.file,this.business,this.registerId);
  }

  onFileChange(event: any)
  {
    this.file = event.target.files[0];
  }

  isActive(businessId?:number)
  {
    var active=this.userEventRepository.getUser(this.registerId).active;
    if(active=='false')
      return true;
    return false;
  }
}
