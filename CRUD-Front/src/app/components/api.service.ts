import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'
const inscription =  environment.create;
const connexion = environment.log;
const displayUsers = environment.allUsers;
const ajouter = environment.fol;
const retirer = environment.unfol;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  signUp(data:any):Observable<any>{
    return this.http.post(inscription, data);
  };

  signIn(data:any):Observable<any>{
    return this.http.post(connexion, data);
  };

  signOut(){
    localStorage.removeItem("loggedUser");
  };

  getUsers():Observable<any>{
    return this.http.get(displayUsers);
  };

  currentUser(id:any):Observable<any>{
    return this.http.get(`${displayUsers}/${id}`);
  };

  editUser(id:any, data:any):Observable<any>{
    return this.http.put(`${displayUsers}/${id}`, data);
  };

  addFriends(id:any, data:any):Observable<any>{
    return this.http.patch(`${ajouter}/${id}`, data);
  };

  deleteFriends(id:any, data:any):Observable<any>{
    return this.http.patch(`${retirer}/${id}`, data);
  };

  cancelUser(id:any):Observable<any>{
    return this.http.delete(`${displayUsers}/${id}`);
  }
}
