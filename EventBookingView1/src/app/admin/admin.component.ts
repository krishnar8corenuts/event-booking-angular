import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  show?:boolean=true;

  ngOnInit(): void {
  }

  path:string="assets/images/home1.jpg";
  hide(){
      this.show=!(this.show);
  }

}
