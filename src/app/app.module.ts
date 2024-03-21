import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/bars/navbar/navbar.component';
import { SidebarComponent } from './components/bars/sidebar/sidebar.component';
import { ContactbarComponent } from './components/bars/contactbar/contactbar.component';

import { ContactComponent } from './components/cores/contact/contact.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { RegisterComponent } from './components/user/register/register.component';

import { HomeComponent } from './components/cores/home/home.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/cores/message/message.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    ContactbarComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    ProfilComponent,
    RegisterComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
