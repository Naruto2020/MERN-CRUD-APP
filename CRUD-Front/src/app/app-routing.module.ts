import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {HomeComponent} from './components/home/home.component';
import {AccountComponent} from './components/account/account.component';
import {AddUsrComponent} from './components/add-usr/add-usr.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {DeleteFriendComponent} from './components/delete-friend/delete-friend.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path : "",
    component:SignUpComponent
  },
  {
    path:"login",
    component:SignInComponent
  },
  {
    path:"home",
    component:HomeComponent,
    canActivate : [AuthGuard],
    children:[
      {
        path:"add-user/:_id",
        component:AddUsrComponent
      }
    ]
  },
  {
    path:"account",
    component:AccountComponent,
    canActivate : [AuthGuard],
    children:[
      {
        path:"cancel-friend/:_id",
        component:DeleteFriendComponent
      }
    ]
  },
  {
    path:"update-user/:_id",
    component:EditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
