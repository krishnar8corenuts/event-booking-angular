import { Business } from './../Business/buiness.model';
import { Injectable } from '@angular/core';
import { RestDataSource } from '../rest.datasource';
import { UserEvent } from './userEvent.model';
import { ServiceBusiness } from '../service/serviceBusiness.model';
import { Facility } from 'src/app/service/service.component';
import { Service } from '../service/service.model';
import { City } from '../Business/city.model';
import { Booking } from './booking.model';
import { Registration } from '../Registration/Registration.model';

@Injectable()
export class UserEventRepository
{
  private serviceBusiness:ServiceBusiness[]=[];
  private facilities:Facility[]=[];
  private services:Service[]=[];
  private businesses:Business[]=[];
  private cities:City[]=[];
  private bookings:Booking[]=[];
  private registration?:Registration;
  private registrations:Registration[]=[];
  private plannerId?:number;

  constructor(private restData:RestDataSource)
  {
    this.restData.getServiceBusiness().subscribe(data=>{
      this.businesses=data.businesses
      this.serviceBusiness=data.serviceBuiness;
    });

    this.restData.getCity().subscribe(data=>{
      this.cities=data;
    });

    this.restData.getBookings().subscribe(data=>{
      this.facilities=data.facilities;
      this.services=data.services;
      this.registrations=data.registrations;
      this.bookings=data.bookings;
    });

  }

  getServiceBusiness()
  {
    return this.serviceBusiness.filter(sb=>this.getRegister(sb.businessId)?.active=='true');
  }

  getFacilities(serviceBusinessId?:number)
  {
    return this.facilities.filter(f=>f.serviceBusinessId==serviceBusinessId);
  }

  getServiceName(serviceId:number | undefined)
  {
      return this.services.filter(data=>data.serviceId==serviceId);
  }

  getBusinessName(businessId?:number)
  {
    return this.businesses.filter(data=>data.businessId==businessId);
  }

  getCityName(cityId?:number)
  {
    return this.cities.filter(c=>c.cityId==cityId)[0];
  }

  saveBooking(booking?:Booking)
  {
      this.restData.saveBooking(booking).subscribe(data=>{
        this.bookings.push(data);
      });
  }

  getBookings(registerId?:number)
  {
    return this.bookings.filter(b=>b.registerId==registerId);
  }

  getServiceB(serviceBusinessId?:number)
  {
    return this.serviceBusiness.filter(sb=>sb.serviceBusinessId==serviceBusinessId)[0];
  }

  getRegister(businessId?:number)
  {
    this.plannerId=this.businesses.find(b=>b.businessId==businessId)?.registerId;
    return this.registrations.find(r=>r.registerId==this.plannerId);
  }

  getUser(userId?:number)
  {
    return this.registrations.filter(r=>r.registerId==userId)[0];
  }

  getPlannerBookings(registerId?:number)
  {
    return this.bookings.filter(b=>this.getRegister(this.getServiceB(b.serviceBusinessId)?.businessId)?.registerId==registerId);
  }

  updateBooking(booking:Booking)
  {
    this.restData.updateBooking(booking).subscribe(data=>{
      this.bookings.splice(this.bookings.findIndex(b=>b.bookingId==data.bookingId),1,data);
    });
  }

  getPlanner()
  {
    return this.registrations.filter(r=>r.roleId==1);
  }

  getBusiness(registerId?:number)
  {
    return this.businesses.filter(b=>b.registerId==registerId)[0];
  }

  getOrders()
  {
    return this.bookings;
  }

  getRegisterEmail(registerId?:number)
  {
    return this.registrations.filter(r=>r.registerId==registerId);
  }

  plannerActive(planner:Registration)
  {
    this.restData.saveRegistration(planner).subscribe(data=>console.log(data));
  }

  getActivePlanner()
  {
    return this.registrations.filter(r=>r.active=='true');
  }
}
