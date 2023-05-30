import { ActivatedRoute } from '@angular/router';
import { UserEventRepository } from './../ModelRepository/userEvent/userevent.repository';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css']
})
export class UserorderComponent implements OnInit {

  registerId?:number;

  constructor(private userEventRepository:UserEventRepository,private activeRoute:ActivatedRoute)
  {
    this.registerId=this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }
  public getBookings()
  {
    return this.userEventRepository.getBookings(this.registerId);
  }

  getServiceBusiness(serviceBusinessId?:number)
  {
    return this.userEventRepository.getServiceB(serviceBusinessId);
  }

  getServiceName(serviceId?:number)
  {
    return this.userEventRepository.getServiceName(serviceId)[0].serviceName;
  }

  getBusinessName(businessId:number | undefined)
  {
    return this.userEventRepository.getBusinessName(businessId)[0];
  }

  getPlannerContact(businessId?:number)
  {
    return this.userEventRepository.getRegister(businessId)?.contact;
  }

  payment()
  {
    console.log("Payment")
  }
}
