import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ApiService} from '../../../components/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter()

  constructor(private api:ApiService, private route:Router) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }

  deco(){
    this.api.signOut();
    console.log(localStorage);
    this.route.navigate(["/login"]);

  }

}
