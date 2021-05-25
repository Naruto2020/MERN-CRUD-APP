import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
//import { HeaderComponent } from './shared/components/header/header.component';
//import { FooterComponent } from './shared/components/footer/footer.component';
//import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { HomeContentComponent } from './components/home/home-content/home-content.component';
import { AccountComponent } from './components/account/account.component';
import { AccountContentComponent } from './components/account/account-content/account-content.component';
import { AddUsrComponent } from './components/add-usr/add-usr.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DeleteFriendComponent } from './components/delete-friend/delete-friend.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    HomeContentComponent,
    AccountComponent,
    AccountContentComponent,
    AddUsrComponent,
    EditUserComponent,
    DeleteFriendComponent,
    CreateUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
