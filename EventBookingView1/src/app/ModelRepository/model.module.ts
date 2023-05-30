import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { RegistrationRepository } from "./Registration/registration.repository";
import { BusinessRepository } from "./Business/business.repository";
import { ServiceRepository } from "./service/service.repository";
import { PostRepository } from "./Post/post.repository";
import { AdminRestDataSource } from "./admin/admin.restdata";
import { AdminRepository } from "./admin/admin.repository";
import { UserHomeRepository } from "./userhome/userhome.repository";
import { UserEventRepository } from "./userEvent/userevent.repository";

@NgModule({
  imports:[HttpClientModule],
  providers:[RestDataSource,RegistrationRepository,BusinessRepository,
    AdminRestDataSource,AdminRepository,
  ServiceRepository,PostRepository,
  UserHomeRepository,UserEventRepository,
]
})

export class ModelModule{}
