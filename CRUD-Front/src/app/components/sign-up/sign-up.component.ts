import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from '../model';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // gestion de la validation des champs
  soumissionPseu : boolean = false;
  soumissionMdp : boolean = false;
  soumissionMail : boolean = false;
  //email = new FormControl('', [Validators.required, Validators.email]);


  options!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private fb:FormBuilder, private api: ApiService, private route:Router) { }

  ngOnInit(): void {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      nom:"",
      username:"",
      email:"",
      password:"",
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
        this.route.navigate(["/login"]);
      this.options.reset({});
      return res;
    });
  }

  fermerAlert(){
    this.soumissionPseu = false;
    this.soumissionMdp = false;
    this.soumissionMail = false;
  }


}
