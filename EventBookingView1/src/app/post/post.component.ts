import { UserEventRepository } from './../ModelRepository/userEvent/userevent.repository';
import { Post } from './../ModelRepository/Post/post.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from '../ModelRepository/Business/buiness.model';
import { PostRepository } from '../ModelRepository/Post/post.repository';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
}) //implements OnInit

export class PostComponent {
  show: boolean = false;
  mode?: string;
  public postForm!: FormGroup;
  businessId?: number;
  business?: Business;
  registerId?: number;
  post: Post = new Post();
  file?: any;
  isActive?:string;

  constructor(
    private formBuilder: FormBuilder,
    private postRepository: PostRepository,
    private activeRoute: ActivatedRoute,
    private router:Router,
    private userEventRepository:UserEventRepository,
  )
  {
    this.registerId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postId: '',
      imagePath: '',
      description: '',
      businessId: '' + this.businessId,
    });

  }

  getBusinessId()
  {
    this.business = this.postRepository.getBusiness(this.registerId)[0];
    return this.business?.businessId;
  }

  upload() {
    this.mode = 'save';
    this.openDialog();
  }

  openDialog() {
    this.isActive=this.userEventRepository.getUser(this.registerId).active;
    if(this.isActive=='false')
    {
      Swal.fire("Can't able to add Post !","You are inactivated by admin","error");
    }
    else
    {
      this.show = !this.show;
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadImage()
  {
    this.post.businessId=this.getBusinessId();
    if( this.post.businessId==undefined)
    {
      Swal.fire("Business is not There !","First add Business !","error");
      this.router.navigateByUrl('/planner/'+this.registerId+'/bussiness');
    }
    this.postRepository.saveImage(this.file,this.post);
    this.openDialog();
  }

  getPost()
  {
    return this.postRepository.getPost(this.getBusinessId());
  }

  getImage(imageId:number)
  {
    return this.postRepository.getImage(imageId);
  }

  getImagePath(imageId:number)
  {
    return "";
  }
}
