import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  sidebarOpen:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  sidebarToggle(){
    this.sidebarOpen = !this.sidebarOpen;
  }

}
