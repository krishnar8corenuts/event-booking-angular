import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public id?:number;
  public role?:string;
  public selectedCategory:string=""

  constructor(private activeRouter:ActivatedRoute,private router:Router) {
    this.id=activeRouter.snapshot.children[0].params['id'];
    this.role=activeRouter.snapshot.url[0].path;
  }
  ngOnInit(): void {
  }
  Category(cat:string)
  {
    this.selectedCategory=cat;
  }

}
