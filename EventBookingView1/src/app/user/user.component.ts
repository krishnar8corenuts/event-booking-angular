import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  show?:boolean=true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  path:string="assets/images/home1.jpg";
  hide(){
      this.show=!(this.show);
  }
}
