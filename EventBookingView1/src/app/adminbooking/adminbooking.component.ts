import { ServiceBusiness } from '../ModelRepository/service/serviceBusiness.model';
import { Booking } from '../ModelRepository/userEvent/booking.model';
import { UserEventRepository } from './../ModelRepository/userEvent/userevent.repository';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminbooking',
  templateUrl: './adminbooking.component.html',
  styleUrls: ['./adminbooking.component.css']
})
export class AdminbookingComponent implements OnInit {

  public serviceBusiness?:ServiceBusiness;

  constructor(private userEventRepository:UserEventRepository) { }

  ngOnInit(): void {
  }

  getBookings()
  {
      return this.userEventRepository.getOrders();
  }

  getserviceBusiness(serviceBusinessId?:number)
  {
    this.serviceBusiness=this.userEventRepository.getServiceB(serviceBusinessId);
    return this.serviceBusiness;
  }

  getBusiness(businessId?:number)
  {
    return this.getRegister(this.userEventRepository.getBusinessName(businessId)[0].registerId);
  }

  getRegister(registerId?:number)
  {
    return this.userEventRepository.getRegisterEmail(registerId)[0];
  }

  getbusinessName(businessId?:number)
  {
    return this.userEventRepository.getBusinessName(businessId)[0];
  }

  getServiceName(serviceId?:number)
  {
    return this.userEventRepository.getServiceName(serviceId)[0];
  }

  status(status?:string,booking?:Booking)
  {
    if(confirm("Are Yo Sure Want to Reject?"))
    {
      if(booking != undefined)
      {
        booking.status=status;
        booking.reason='Rejected by admin,Planner is not responding'
        this.userEventRepository.updateBooking(booking);
        Swal.fire("Order is Rejected !","","error");
      }
    }
  }
}
