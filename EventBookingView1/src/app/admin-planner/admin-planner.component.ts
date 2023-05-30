import { Business } from '../ModelRepository/Business/buiness.model';
import { Registration } from '../ModelRepository/Registration/Registration.model';
import { UserEventRepository } from './../ModelRepository/userEvent/userevent.repository';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-planner',
  templateUrl: './admin-planner.component.html',
  styleUrls: ['./admin-planner.component.css']
})
export class AdminPlannerComponent implements OnInit {

public business?:Business;

  constructor(private userEventRepository:UserEventRepository)
  {

  }

  ngOnInit(): void {
  }

  getPlanner()
  {
      return this.userEventRepository.getPlanner();
  }

  getBusinessName(registerId?:number)
  {
    this.business=this.userEventRepository.getBusiness(registerId);
    if(this.business==undefined)
    {
      return "Not Register Yet";
    }
    else
    {
        return this.business.businessName;
    }
  }

  getCityName()
  {
    if(this.business==undefined)
    {
      return '--';
    }
    else
    {
      return this.userEventRepository.getCityName(this.business?.cityId).cityName
    }
  }

  plannerActive(active:boolean,planner?:Registration)
  {
    if(planner !=undefined)
    {
      if(active)
      {
        planner.active='true'
      }
      else
      {
        planner.active='false'
      }
      this.userEventRepository.plannerActive(planner)
    }
  }
}
