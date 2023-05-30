export class Business{
  constructor(
    public businessId?:number,
    public businessName?:string,
    public locationId?:number,
    public registerId?:number | undefined,
    public pincode?:number,
    public description?:string,
    public cityId?:number,
    public imageId?:any,
  ){}
}

