// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  registration:"http://localhost:9061/",
  business:"http://localhost:9062/",
  service:"http://localhost:9063/",
  post:"http://localhost:9064/",
  booking:"http://localhost:9065/",
  image:"http://localhost:9066/",

  prodRegistration:"http://10.0.8.12:8081/",
  prodBusiness:"http://10.0.8.12:8082/",
  prodService:"http://10.0.8.12:8083/",
  prodPost:"http://10.0.8.12:8084/",
  prodBooking:"http://10.0.8.12:8085/",
  prodImage:"http://10.0.8.12:8086/",

  getUrl(data:string)
  {
    if(environment.production)
    {
      if(data==='registration')
      {
        return environment.prodRegistration;
      }
      else if(data==='business')
      {
        return environment.prodBusiness;
      }
      else if(data==='service')
      {
        return environment.prodService;
      }
      else if(data==='post')
      {
        return environment.prodPost;
      }
      else if(data==='booking')
      {
        return environment.prodBooking;
      }
      else if(data==='image')
      {
        return environment.prodImage;
      }
      else
      {
        return "";
      }
    }
    else
    {
      if(data==='registration')
      {
        return environment.registration;
      }
      else if(data==='business')
      {
        return environment.business;
      }
      else if(data==='service')
      {
        return environment.service;
      }
      else if(data==='post')
      {
        return environment.post;
      }
      else if(data==='booking')
      {
        return environment.booking;
      }
      else if(data==='image')
      {
        return environment.image;
      }
      else
      {
        return "";
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
