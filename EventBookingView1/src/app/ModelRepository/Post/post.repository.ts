import { Image } from './image.model';
import { RestDataSource } from './../rest.datasource';
import { Business } from './../Business/buiness.model';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from './post.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostRepository
{
  business:Business[] = [];
  registerId?:number;
  post:any;
  posts:Post[] = [];
  imagePath:any;
  imageName:string='';
  image?:Image;

  constructor(private restData:RestDataSource,private activeRoute:ActivatedRoute)
  {
      this.restData.getPost().subscribe(data=>{
        this.business=data.businesses;
        this.posts=data.posts;
        for(let post of this.posts)
        {
          this.restData.getImage(post.imageId).subscribe(data=>{
            this.imageName=data.imageName;
            post.imagePath=environment.getUrl('image')+"api/image/get/"+this.imageName;
          });
        }
      });
  }

  getBusiness(registerId:number | undefined)
  {
      return this.business.filter(data=>data.registerId==registerId);
  }

  saveImage(file:any,post:Post)
  {
    const uploadImage = new FormData();
    uploadImage.append('image', file);
    this.restData.saveImage(uploadImage).subscribe((response) => {
          if (post!=undefined) {
            post.imageId=response.body;
            this.restData.savePost(post).subscribe(data=>this.posts.push(data));
          }
    });

  }

  getPost(businessId?:number)
  {
      return this.posts.filter(ps=>ps.businessId==businessId);
  }

  getImage(imageId:number)
  {
    this.restData.getImage(imageId);
  }
}
