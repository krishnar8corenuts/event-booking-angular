import { City } from "./city.model";

export class Location{
  constructor(
    public locationId?:number,
    public pincode?:number,
    public city?:City,
  ){}
}
