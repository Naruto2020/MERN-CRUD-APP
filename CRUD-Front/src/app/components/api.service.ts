import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  signUp(data:any):Observable<any>{
    return this.http.post(`http://localhost:5000/api/users/register`, data);
  };

  signIn(data:any):Observable<any>{
    return this.http.post(`http://localhost:5000/api/users/login`, data);
  };

  signOut(){
    localStorage.removeItem("loggedUser");
  };

  getUsers():Observable<any>{
    return this.http.get(`http://localhost:5000/api/users`);
  };

  currentUser(id:any):Observable<any>{
    return this.http.get(`http://localhost:5000/api/users/${id}`);
  };

  editUser(id:any, data:any):Observable<any>{
    return this.http.put(`http://localhost:5000/api/users/${id}`, data);
  };

  addFriends(id:any, data:any):Observable<any>{
    return this.http.patch(`http://127.0.0.1:5000/api/users/follow/${id}`, data);
  };

  deleteFriends(id:any, data:any):Observable<any>{
    return this.http.patch(`http://127.0.0.1:5000/api/users/unfollow/${id}`, data);
  };

  cancelUser(id:any):Observable<any>{
    return this.http.delete(`http://localhost:5000/api/users/${id}`);
  }
}
