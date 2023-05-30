import { Injectable } from '@angular/core';
import { Registration } from '../Registration/Registration.model';
import { AdminRestDataSource } from './admin.restdata';


@Injectable()
export class AdminRepository
{
  requests:Registration[] = [];
  constructor(private admindata:AdminRestDataSource)
  {
    this.admindata.getRequest().subscribe(data=>{
        this.requests=data;
      })
  }

  getRequest()
  {
    return this.requests;
  }

  updateRequest(request:Registration)
  {
    this.admindata.updateRequest(request).subscribe(data=>this.requests.splice(this.requests.findIndex(r=>r.registerId=data.registerId),1));
  }

}
