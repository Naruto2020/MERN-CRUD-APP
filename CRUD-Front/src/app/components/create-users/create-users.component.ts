import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from '../model';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  currentUserId:any;

  hide = true;

  // gestion de la validation des champs
  soumissionPseu : boolean = false;
  soumissionMdp : boolean = false;
  soumissionMail : boolean = false;
  //email = new FormControl('', [Validators.required, Validators.email]);


  options!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private fb:FormBuilder, private api: ApiService, private route:Router, private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.currentUserId = localStorage.getItem("loggedUser");
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      nom:"",
      username:"",
      email:"",
      password:"",
      idTofollow:""
    });
  }

  addUser(){
    const formValue = this.options.value;
    const newUser = new User();
    newUser.username = formValue["username"];
    newUser.email = formValue["email"];
    newUser.password = formValue["password"];
    this.api.signUp(newUser).subscribe(res =>{
      let results:any[] = Object.values(res);
      console.log(results);

      let errorEmail = results[0].email;
      let errorPassword = results[0].password;
      let errorUsername = results[0].username;
      if(errorEmail)
        this.soumissionMail = true;
      if(errorPassword)
        this.soumissionMdp = true;
      if(errorUsername)
        this.soumissionPseu = true;

      if(!errorUsername && !errorEmail && !errorPassword)
        this.route.navigate(["/home"]);
      this.options.reset({});

      /** envois de la demande d'amis et ajout a la liste des utilisateurs  */
      // recupération de la data
      this.options.controls.idTofollow.setValue(this.currentUserId);
      const formValue = this.options.value;
      console.log("dataID",formValue)

      // recuperation de l'id
      this.router.paramMap.subscribe(paramMap =>{
        if(!paramMap.has("_id")){
          return;
        }
        const usrId = paramMap.get("_id");
        // ajout de l'utilisateur
        this.api.addFriends(usrId, formValue).subscribe(res =>{
          console.log("loock",res);
          return res;
        });
      });
      return res;

    });
  }

  fermerAlert(){
    this.soumissionPseu = false;
    this.soumissionMdp = false;
    this.soumissionMail = false;
  }

}
