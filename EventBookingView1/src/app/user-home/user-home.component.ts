import { Component, OnInit } from '@angular/core';
import { UserHomeRepository } from '../ModelRepository/userhome/userhome.repository';
import { Post } from '../ModelRepository/Post/post.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  description?:string;
  collaped:boolean = true;
  showAll?:boolean;
  post?:Post;

  constructor(private userHomeRepository: UserHomeRepository) { }

  ngOnInit(): void {

  }
public getPost(){

 return this.userHomeRepository.getPost();
 
}

}
