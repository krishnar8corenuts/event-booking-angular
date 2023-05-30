import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../ModelRepository/userEvent/booking.model';
import { UserEventRepository } from './../ModelRepository/userEvent/userevent.repository';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userevent',
  templateUrl: './userevent.component.html',
  styleUrls: ['./userevent.component.css']
})
export class UsereventComponent implements OnInit {

  public show:boolean=false;
  public booking=new Booking();
  serviceBusinessId?:number;
  registerId?:number;
  showAll:boolean = false;

  constructor(private userEventRepository:UserEventRepository,private router:Router,
              private activeRoute:ActivatedRoute)
  {
    this.registerId=this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  getServiceBusiness()
  {
    return this.userEventRepository.getServiceBusiness();
  }

  getFacilities(serviceBusinessId?:number)
  {
    return this.userEventRepository.getFacilities(serviceBusinessId);
  }

  getServiceName(serviceId:number | undefined)
  {
      return this.userEventRepository.getServiceName(serviceId)[0].serviceName;
  }

  getBusinessName(businessId:number | undefined)
  {
    return this.userEventRepository.getBusinessName(businessId)[0];
  }

  getCityName(cityId?:number)
  {
    return this.userEventRepository.getCityName(cityId).cityName;
  }

  openBooking(serviceBusinessId?:number)
  {
    this.serviceBusinessId=serviceBusinessId;
    this.show=!(this.show);
  }

  saveBooking(){
    this.booking.status='Pending'
    this.booking.serviceBusinessId=this.serviceBusinessId;
    this.booking.registerId=this.registerId;
    this.userEventRepository.saveBooking(this.booking);
    Swal.fire("Booking Request Has been Sent !","Please wait for confirmation from Planner","success");
    this.router.navigateByUrl("user/"+this.registerId+"/order");
   }

   facilityHide()
   {
    this.showAll=!this.showAll;
   }

   getMinDate()
   {
    const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1; // January is 0
      const year = today.getFullYear();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

   }
}
