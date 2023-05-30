import { Component, OnInit } from '@angular/core';
import { UserEventRepository } from '../ModelRepository/userEvent/userevent.repository';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../ModelRepository/userEvent/booking.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  registerId?:number;
  isActive?:string;
  reason?:string|null;

  constructor(private userEventRepository:UserEventRepository,private activeRoute:ActivatedRoute)
  {
    this.registerId=this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  public getBookings()
  {
    return this.userEventRepository.getPlannerBookings(this.registerId);
  }

  getServiceBusiness(serviceBusinessId?:number)
  {
    return this.userEventRepository.getServiceB(serviceBusinessId);
  }

  getServiceName(serviceId?:number)
  {
    return this.userEventRepository.getServiceName(serviceId)[0].serviceName;
  }

  getUser(userId?:number)
  {
    return this.userEventRepository.getUser(userId).email;
  }

  status(status:string,booking:Booking)
  {
    this.isActive=this.userEventRepository.getUser(this.registerId).active;
    if(this.isActive=='false')
    {
      if(status=='Confirm')
        Swal.fire("Can't able to Accept Order !","You are inactivated by admin","error");
      if(status=='Rejected')
      Swal.fire("Can't able to Reject Order !","You are inactivated by admin","error");
    }
    else
    {
      if(status=='Confirm')
      {
        booking.status='Confirm';
        booking.reason='Not Paid';
        this.userEventRepository.updateBooking(booking);
        Swal.fire("Order is Confirmed !","","success");
      }
      if(status=='Rejected')
      {
        this.reason=prompt("Why you are Rejecting?");
        if(this.reason!=null)
        {
          booking.status='Rejected';
          booking.reason=this.reason;
          this.userEventRepository.updateBooking(booking);
          Swal.fire("Order is Rejected !","","error");
        }
      }
    }
  }
}
