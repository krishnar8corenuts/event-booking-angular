import { Facility } from "src/app/service/service.component";


export class ServiceBusiness{
  constructor(
    public serviceBusinessId:number,
    public serviceId:number,
    public cost:number,
    public businessId:number | undefined,
    public facilities:Facility[] = [],
  ){}
}
