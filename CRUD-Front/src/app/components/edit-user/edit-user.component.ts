import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from '../model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  alert:boolean= false;

  currentUserId:any;

  options!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private fb: FormBuilder, private api: ApiService, private router:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("loggedUser");
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      age:"",
      famille:"",
      race:"",
      nourriture:""
    });

    this.router.paramMap.subscribe(paramMap =>{
      if(!paramMap.has("_id"))
        return;

      const userId = paramMap.get("_id");
      this.api.currentUser(userId).subscribe(res =>{
        this.options = this.fb.group({
          age:res["age"],
          famille:res["famille"],
          race:res["race"],
          nourriture:res["nourriture"],
        });

      });
    });
  }

  mettreAjour(){
    let userId = this.currentUserId;
    let formValue = this.options.value;
    console.log("MAJ", userId);

    this.api.editUser(userId, formValue).subscribe(res =>{
      this.options = this.fb.group({
        age:res["age"],
        famille:res["famille"],
        race:res["race"],
        nourriture:res["nourriture"],
      });

      this.route.navigate(["/home"]);
    });
  }

  fermer(){
    this.route.navigate(["/account"]);
  }

  fermerAlert(){
    this.alert = false;
  };

}
