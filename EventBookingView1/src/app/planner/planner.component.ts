import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  show?:boolean=true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  path:string="assets/images/home1.jpg";
  hide(){
      this.show=!(this.show);
  }
}
