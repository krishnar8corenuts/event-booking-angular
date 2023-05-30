import { Component, OnInit } from '@angular/core';
import { AdminRepository } from '../ModelRepository/admin/admin.repository';
import { Registration } from '../ModelRepository/Registration/Registration.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private adminRepository:AdminRepository)
  {
  }

  ngOnInit(): void {
  }

  getRequest()
  {
    return this.adminRepository.getRequest();
  }

  acceptRequest(request:Registration)
  {
    request.status='false';
    request.roleId=1;
    this.adminRepository.updateRequest(request);
  }

  rejectRequest(request:Registration)
  {
    if(confirm("Are you sure want to Reject this Request !"))
    {
      request.status='false';
      this.adminRepository.updateRequest(request);
    }
  }

}
