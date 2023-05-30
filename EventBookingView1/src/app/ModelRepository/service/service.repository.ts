import { ServiceBusiness } from './serviceBusiness.model';
import { RestDataSource } from '../rest.datasource';
import { Service } from './service.model';
import { Injectable } from '@angular/core';
import { Facility } from 'src/app/service/service.component';
import { Business } from '../Business/buiness.model';

@Injectable()
export class ServiceRepository
{
  private services:Service[] = [];
  private serviceBusiness:ServiceBusiness[] = [];
  private businesses:Business[] = [];
  private facilities:Facility[]=[];

  constructor(private restData:RestDataSource)
  {
      this.restData.getService().subscribe(data=>
        {this.services=data});

        this.restData.getServiceBusiness().subscribe(data=>{
          this.serviceBusiness=data.serviceBuiness;
          this.businesses=data.businesses;
        });

        this.restData.getFacilities().subscribe(data=>{
          this.facilities=data;
        });
  }

  getService()
  {
      return this.services;
  }

  getBusiness(registerId?:number)
  {
    return this.businesses.filter(b=>b.registerId==registerId)[0];
  }

  getFacilities(serviceBusinessId?:number)
  {
    return this.facilities.filter(f=>f.serviceBusinessId==serviceBusinessId);
  }

  saveServiceBusiness(serviceBusiness:ServiceBusiness | undefined)
  {
    if(serviceBusiness?.serviceBusinessId==undefined || serviceBusiness?.serviceBusinessId==null)
    {
      this.restData.saveServiceBusiness(serviceBusiness).subscribe(data=>{
            this.serviceBusiness.push(data);
            for(let f of data.facilities)
            {
              this.facilities.push(f);
            }
        });
    }
    else
    {
      this.restData.saveServiceBusiness(serviceBusiness).subscribe(data=>{
          let index=this.serviceBusiness.findIndex(sc=>sc.serviceBusinessId==data.serviceBusinessId);
          this.serviceBusiness.splice(index,1,data);
         for(let f of data.facilities)
         {
            this.facilities.splice(this.facilities.findIndex(fc=>fc.facilityId==f.facilityId),1,f);
         }
        }
      )

    }

  }

  getServiceBusiness(businessId:number | undefined)
  {
      return this.serviceBusiness.filter(sc=>sc.businessId==businessId);
  }

  getServiceName(serviceId:number | undefined)
  {
      return this.services.filter(data=>data.serviceId==serviceId);
  }

  deleteServiceBusiness(serviceBusiness:ServiceBusiness)
  {
    this.restData.deleteServiceBusiness(serviceBusiness.serviceBusinessId).subscribe(data=>{
      this.serviceBusiness
      .splice(this.serviceBusiness.findIndex(sc=>sc.serviceBusinessId==serviceBusiness?.serviceBusinessId),1);
      for(let f of data.facilities)
      {
        this.facilities.splice(this.facilities.findIndex(fc=>fc.facilityId==f.facilityId),1);
      }
    });
  }
}
