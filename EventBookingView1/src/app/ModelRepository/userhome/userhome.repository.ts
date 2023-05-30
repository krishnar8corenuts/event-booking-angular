import { UserEventRepository } from './../userEvent/userevent.repository';
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "../service/service.model";
import { Post } from "../Post/post.model";
import { RestDataSource } from "../rest.datasource";
import { Registration } from '../Registration/Registration.model';
import { Business } from '../Business/buiness.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserHomeRepository  {

  posts:Post[]=[];
  imageName:string='';
  businessImageName:string='';
  activePlanner:Registration[]=[];
  activeBusiness:Business[]=[];

  constructor(private router:Router,private activeRoute:ActivatedRoute,
    private restData:RestDataSource,private userEventRepository:UserEventRepository)
  {
      this.restData.getPost().subscribe(data=>{
        this.posts=data.posts;
        for(let post of this.posts)
        {
          this.restData.getImage(post.imageId).subscribe(data=>{
            this.imageName=data.imageName;
            post.imagePath=environment.getUrl('image')+"api/image/get/"+this.imageName;
            this.restData.getBusiness().subscribe(bs=>{
              post.businessName=bs.filter(b=>b.businessId==post.businessId)[0].businessName;
                restData.getImage(bs.filter(b=>b.businessId==post.businessId)[0].imageId).subscribe(data=>{
                    this.businessImageName=data.imageName;
                    post.businessImagePath=environment.getUrl('image')+"api/image/get/"+this.businessImageName;
                });
            })
          });
        }
      })
  }

  getPost()
  {
      this.activePlanner=this.userEventRepository.getActivePlanner();
      return this.posts.filter(p=>this.userEventRepository.getRegister(p.businessId)?.active=='true');
  }
  }
