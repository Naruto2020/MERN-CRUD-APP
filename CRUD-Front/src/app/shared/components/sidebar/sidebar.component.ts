import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../components/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUserId:any;
  usersList:any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("loggedUser");
    this.api.getUsers().subscribe(res =>{
      console.log("les ut", res)
      this.usersList = res;
    });
  }

}
