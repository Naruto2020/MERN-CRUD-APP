import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import {User} from '../../model';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-account-content',
  templateUrl: './account-content.component.html',
  styleUrls: ['./account-content.component.scss']
})
export class AccountContentComponent implements OnInit {
currentUserId:any;

  columnsList: string[] = [ 'username', 'age', 'famille', "race", "nourriture", "delete"];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  User_Data :any;
  dataSource!: MatTableDataSource<User>;

  constructor( private api:ApiService, private router:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("loggedUser");
    this.api.getUsers().subscribe(res =>{
      console.log("liste", res);
      let friendsTab = [];
      for(let i=0; i<res.length; i++){
        let followersTab = res[i].followers;
        let followingsTab = res[i].followings;

        for(let j=0; j<followersTab.length; j++){
          for(let k=0; k<followingsTab.length; k++){
            if(this.currentUserId === followingsTab[k] && this.currentUserId === followersTab[j]){
              friendsTab.push(res[i]);
            }
          }
        }
      }
      this.User_Data = friendsTab;
      this.dataSource = new MatTableDataSource(this.User_Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
