import { Role } from './Role/Role.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Registration } from "./Registration/Registration.model";
import { State } from './Business/State.model';
import { City } from './Business/city.model';
import { Business } from './Business/buiness.model';
import { Service } from './service/service.model';
import { ServiceBusiness } from './service/serviceBusiness.model';
import { Facility } from '../service/service.component';
import { Post } from './Post/post.model';
import { Image } from './Post/image.model';
import { Booking } from './userEvent/booking.model';
import { resourceUsage } from 'process';
import { environment } from 'src/environments/environment';



@Injectable()
export class RestDataSource{

  constructor(private http:HttpClient,private router:Router){

  }

  registrationUrl=environment.getUrl('registration');
  businessUrl=environment.getUrl('business');
  serviceUrl=environment.getUrl('service');
  postUrl=environment.getUrl('post');
  bookingUrl=environment.getUrl('booking');
  imageUrl=environment.getUrl('image');

  getRole() : Observable<Role[]>
  {
    return this.http.get<Role[]>(this.registrationUrl+"api/registration/roles");
  }

  saveRegistration(registration:Registration) : Observable<Registration>
  {
    return this.http.post<Registration>(this.registrationUrl+"api/registration",registration,{responseType:'json'});
  }
  login(email:any,password:any) : Observable<Registration>
  {
      return this.http.get(this.registrationUrl+"api/registration/"+email+"/"+password);
  }
  checkEmail(email:any) : Observable<Registration>
  {
    return this.http.get(this.registrationUrl+"api/registration/"+email);
  }

  forgotPassword(registration:Registration) : Observable<Registration>
  {
    return this.http.put(this.registrationUrl+"api/registration",registration,{responseType:'json'});
  }

  getState() :Observable<State[]>
  {
    return this.http.get<State[]>(this.businessUrl+"api/business/states");
  }

  getCity() : Observable<City[]>
  {
     return this.http.get<City[]>(this.businessUrl+"api/business/city");
  }

  saveBusiness(business:Business | undefined) : Observable<Business>
  {
    return this.http.post<Business>(this.businessUrl+"api/business",business,{responseType:'json'});
  }

  getBusiness() :Observable<Business[]>
  {
     return this.http.get<Business[]>(this.businessUrl+"api/business/getbusiness");
  }

  getService() : Observable<Service[]>
  {
    return this.http.get<Service[]>(this.serviceUrl+"api/service/getservices");
  }

  saveServiceBusiness(serviceBusiness:ServiceBusiness | undefined) :Observable<ServiceBusiness>
  {
    return this.http.post<ServiceBusiness>(this.serviceUrl+"api/service",serviceBusiness,{responseType:'json'});
  }

  getServiceBusiness() :Observable<any>
  {
    return this.http.get(this.serviceUrl+"api/service");
  }

  deleteServiceBusiness(serviceBusinessId:number) :Observable<ServiceBusiness>
  {
      return this.http.delete<ServiceBusiness>(this.serviceUrl+"api/service/"+serviceBusinessId);
  }

  getPostbusiness(registerId:number | undefined) :Observable<Business>
  {
    return this.http.get<Business>(this.postUrl+"api/post/business"+registerId);
  }

  saveImage(uploadImage:any) :Observable<any>
  {
    return this.http.post(this.imageUrl+"api/image",uploadImage,{observe: 'response'})
  }

  getFacilities() :Observable<Facility[]>
  {
    return this.http.get<Facility[]>(this.serviceUrl+"api/service/facilities");
  }

  savePost(post:Post) : Observable<Post>
  {
    return this.http.post(this.postUrl+"api/post",post,{responseType:'json'});
  }

  getPost():Observable<any>
  {
    return this.http.get(this.postUrl+"api/post");
  }

  getImage(imageId:number) : Observable<Image>
  {
      return this.http.get<Image>(this.imageUrl+"api/image/"+imageId);
  }

  saveBooking(booking?:Booking) : Observable<Booking>
  {
    return this.http.post<Booking>(this.bookingUrl+"api/booking",booking,{responseType:'json'});
  }

  getBookings() :Observable<any>
  {
    return this.http.get(this.bookingUrl+"api/booking");
  }

  getRegister(plannerId?:number):Observable<Registration>
  {
    return this.http.get<Registration>(this.registrationUrl+"api/registration/planner/"+plannerId);
  }

  getPlanner():Observable<Registration[]>
  {
    return this.http.get<Registration[]>(this.registrationUrl+"api/registration");
  }

  updateBooking(booking:Booking) :Observable<Booking>
  {
    return this.http.put<Booking>(this.bookingUrl+"api/booking",booking,{responseType:'json'});
  }
}
