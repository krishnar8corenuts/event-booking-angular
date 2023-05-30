import { Facility } from "src/app/service/service.component";

export class UserEvent
{
  constructor(
    public serviceId:number,
    public serviceName:string,
    public serviceBusinessId:number,
    public businessId:number,
    public businessName:string,
    public cost:number,
    public facility:Facility[]=[],
    public city:string,
    public state:string,
    public pincode:number,
  ){}
}
