import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidebarOpen:boolean= true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  sidebarToggle(){
    this.sidebarOpen = !this.sidebarOpen;
  }

}
