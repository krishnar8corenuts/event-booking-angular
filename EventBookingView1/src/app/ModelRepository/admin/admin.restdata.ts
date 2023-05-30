import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Registration } from "../Registration/Registration.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const PORT = 9061;
const PROTOCOL = "http";

@Injectable()
export class AdminRestDataSource
{
  baseUrl:string;


  constructor(private http:HttpClient,private router:Router){
    this.baseUrl=environment.getUrl('registration')+"api/registration";
  }


  getRequest() : Observable<Registration[]>
  {
    return this.http.get<Registration[]>(this.baseUrl+"/getrequest");
  }

  updateRequest(request:Registration) :Observable<Registration>
  {
      return this.http.put<Registration>(this.baseUrl,request,{responseType:'json'});
  }
}
