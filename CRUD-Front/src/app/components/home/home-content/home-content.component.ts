import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import {User} from '../../model';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  columnsList: string[] = [ 'username', 'age', 'ajouter', 'create'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  User_Data :any;
  dataSource!: MatTableDataSource<User>;

  constructor(private api:ApiService, private router:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(res =>{
      this.User_Data = res;
      this.dataSource = new MatTableDataSource(this.User_Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


}
