import { PlannerComponent } from './../../planner/planner.component';
import { Injectable } from "@angular/core";
import { Business } from "./buiness.model";
import { State } from "./State.model";
import { City } from "./city.model";
import { RestDataSource } from "../rest.datasource";
import { ActivatedRoute, Router } from "@angular/router";
import { RegistrationRepository } from '../Registration/registration.repository';
import Swal from 'sweetalert2';

@Injectable()
export class BusinessRepository
{
  private business?:Business;
  private state:State[] = [];
  private city:City[] = [];
  private businesses:Business[] = [];
  private status:string = "";
  private stateId:any;
  private xyz?:Business;
  private registerId?:number | undefined;
  private imageId?:number;

  constructor(private dataSource:RestDataSource,private roter:Router,private registrationRepository:RegistrationRepository,
    private activeRoute:ActivatedRoute)
  {
    this.registerId=this.activeRoute.snapshot.params['id'];

    this.dataSource.getState().subscribe(data=>{
        this.state = data;
    });

    this.dataSource.getCity().subscribe(data=>{
      this.city = data;
    });

    this.dataSource.getBusiness().subscribe(data=>{
        this.businesses=data;
    });
  }

  getState()
  {
    return this.state;
  }

  getCity(stateId:any)
  {
    return this.city.filter(c=>c.stateId==stateId);
  }

  saveBusiness(business:Business | undefined)
  {
    this.dataSource.saveBusiness(business).subscribe();
  }

  getBusiness(registerId:number | undefined)
  {

    this.business=this.businesses.filter(b=>b.registerId=registerId)[0];

    return this.business;
  }
   saveImage(file:any,business?:Business,registerId?:number | undefined)
  {
    const uploadImage = new FormData();
    uploadImage.append('image', file);
    let x=this.dataSource.saveImage(uploadImage).subscribe((response) => {
        if(business!=undefined)
        {
          business.imageId=response.body+'';
          this.dataSource.saveBusiness(business).subscribe(data=>this.businesses.push(data));
        }
        });
        Swal.fire("Business Added Successfully !","","success");

        this.roter.navigateByUrl('/planner/'+registerId+'/bussiness');
  }
}
