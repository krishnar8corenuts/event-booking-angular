import { UserEventRepository } from './../ModelRepository/userEvent/userevent.repository';
import { ServiceBusiness } from './../ModelRepository/service/serviceBusiness.model';
import { Component, OnInit } from '@angular/core';
import { ServiceRepository } from '../ModelRepository/service/service.repository';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from '../ModelRepository/Business/buiness.model';
import { BusinessRepository } from '../ModelRepository/Business/business.repository';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';

export interface Facility {
  facilityName: string;
  facilityId:number;
  serviceBusinessId:number;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public show:boolean = false;
  public dataSource:any;
  public serviceForm !: FormGroup;
  public registerId?:number;
  public business?:Business;
  public serviceBusiness?:ServiceBusiness;
  public businessId?:number;
  public mode?:string;
  public serviceId?:number;
  isActive?:string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  facilities: Facility[] = [];

  constructor(private serviceRepository:ServiceRepository,private formBuilder:FormBuilder,
    private activeRoute:ActivatedRoute,private businessRepository:BusinessRepository,
   private router:Router,private userEventRepository:UserEventRepository)
  {
      this.registerId=this.activeRoute.snapshot.params['id'];
      this.serviceId=this.serviceBusiness?.serviceId;
  }

  ngOnInit(): void
  {
    this.serviceForm= this.formBuilder.group({
       serviceId:(''),
       cost:(''),
       businessId:(''+this.businessId),
    })
  }

  add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

    // Add Faciliy
    if ((value || '').trim()) {
      this.facilities.push({facilityName: value.trim(),facilityId:0,serviceBusinessId:0});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(facilities: Facility): void {
    const index = this.facilities.indexOf(facilities);

    if (index >= 0) {
      this.facilities.splice(index, 1);
    }
  }

  getService()
  {
    return this.serviceRepository.getService();
  }

  addServiceBusiness()
  {
      this.mode="save";
      this.openDialog(this.mode);
  }

  openDialog(mode:string)
  {
    this.isActive=this.userEventRepository.getUser(this.registerId).active;
    if(this.isActive=='false')
    {
      if(mode=='save')
        Swal.fire("Can't able to add Service !","You are inactivated by admin","error");
      else
      Swal.fire("Can't able to update Service !","You are inactivated by admin","error");
    }
    else
    {
      if(mode=='save')
      {
        this.serviceForm.controls["serviceId"].setValue('');
        this.serviceForm.controls["cost"].setValue('');
        this.facilities.splice(0,this.facilities.length);
      }
      this.show=!this.show;
    }
  }

  saveServiceBusiness()
  {

    this.business=this.serviceRepository.getBusiness(this.registerId);
    if(this.business==undefined)
    {
      Swal.fire("Business is not There !","First add Business !","error");
      this.router.navigateByUrl('/planner/'+this.registerId+'/bussiness');
    }
    if(this.mode!='edit')
    {
      this.serviceBusiness = this.serviceForm.value;
    }
    if(this.serviceBusiness != undefined)
    {
      this.serviceBusiness.facilities=this.facilities;
      this.serviceBusiness.businessId=this.business.businessId;
    }
    this.serviceBusiness!.serviceId=this.serviceForm.value.serviceId
    this.serviceBusiness!.cost=this.serviceForm.value.cost;
    this.serviceRepository.saveServiceBusiness(this.serviceBusiness);
    this.openDialog("save");
  }

  getServiceBusiness()
  {
    this.business=this.serviceRepository.getBusiness(this.registerId);
    return this.serviceRepository.getServiceBusiness(this.business.businessId);
  }

  getServiceName(serviceId:number | undefined)
  {
      return this.serviceRepository.getServiceName(serviceId)[0].serviceName;
  }

  getFacilities(serviceBusinessId?:number)
  {
    return this.serviceRepository.getFacilities(serviceBusinessId);
  }

  editServiceBusiness(serviceBusiness:ServiceBusiness)
  {
    this.serviceBusiness=serviceBusiness;
    this.serviceId=serviceBusiness?.serviceId;
    this.serviceForm.controls["serviceId"].setValue(this.serviceId, {onlySelf: true});
    this.serviceForm.controls["cost"].setValue(serviceBusiness.cost);
    this.serviceForm.controls["businessId"].setValue(serviceBusiness.businessId);
    Object.assign(this.facilities, this.getFacilities(serviceBusiness.serviceBusinessId));
    this.mode="edit";
    this.openDialog(this.mode);
  }

  deleteServiceBusiness(serviceBusiness:ServiceBusiness)
  {
    this.isActive=this.userEventRepository.getUser(this.registerId).active;
    if(this.isActive=='false')
    {
      Swal.fire("Can't able to delete Service !","You are inactivated by admin","error");
    }
    else
    {
      if(confirm("Are You Sure Want to Delete this Service !"))
      {
        this.serviceBusiness=serviceBusiness;
        Object.assign(this.facilities, this.getFacilities(serviceBusiness.serviceBusinessId));
        this.serviceBusiness.facilities=this.facilities;
        this.serviceRepository.deleteServiceBusiness(this.serviceBusiness);
        this.serviceBusiness=undefined;
      }
    }
  }
}
