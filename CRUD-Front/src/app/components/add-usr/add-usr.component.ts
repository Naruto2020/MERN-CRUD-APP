import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-usr',
  templateUrl: './add-usr.component.html',
  styleUrls: ['./add-usr.component.scss']
})
export class AddUsrComponent implements OnInit {

  currentUserId!:any;
  options!: FormGroup;


  constructor(
    private fb:FormBuilder, private route:Router,
    private api:ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("loggedUser")
    console.log("current",this.currentUserId);
    this.options = this.fb.group({
      idTofollow:""
    });
  }

  follow(){
    // recupération de la data
    this.options.controls.idTofollow.setValue(this.currentUserId);
    const formValue = this.options.value;
    console.log("dataID",formValue)

    // recupération de l'id en paramètre
    this.router.paramMap.subscribe(paramMap =>{
      if(!paramMap.has("_id")){
        return

      }
      const userId = paramMap.get("_id");
      console.log("paramId", userId);
      this.api.addFriends(userId, formValue).subscribe(res =>{
        console.log(res);
        return res;
      });
    });
    this.route.navigate(["/home"]);
  }

  fermer(){
    this.route.navigate(["/home"]);
  };

}
