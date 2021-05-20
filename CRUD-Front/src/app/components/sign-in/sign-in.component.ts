import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  alert:boolean= false;
  // gestions des eeruers
  soumissionMdp : boolean = false;
  soumissionMail : boolean = false;
  //email = new FormControl('', [Validators.required, Validators.email]);

  options!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private fb:FormBuilder, private route:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      email:"",
      password:"",
    });
  }

  connexion(){
    const formValue = this.options.value;
    this.api.signIn(formValue).subscribe(res =>{

      let results:any[] = Object.values(res);

      let emailError = results[0].email;
      let passwordError = results[0].password;

      if(emailError){
        this.soumissionMail = true;
      }else if(passwordError){
        this.soumissionMdp = true;
      }else{
        this.options.reset({});
        this.route.navigate(["/home"]);
        // gestion du stockage des données dans la session du nav
        localStorage.setItem("loggedUser", results[0]);

      }
      return res;
    });
  }

  fermerAlert(){
    this.soumissionMdp = false;
    this.soumissionMail = false;
  }

}
