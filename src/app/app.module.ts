import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { EventComponent } from './components/cores/event/event.component';
import { CreatorModalComponent } from './components/modals/CreatorModal/CreatorModal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DiveplaceModalComponent } from './components/modals/diveplaceModal/diveplaceModal.component';
import { ClubModalComponent } from './components/modals/clubModal/clubModal.component';
import { TrainingModalComponent } from './components/modals/trainingModal/trainingModal.component';
import { OrganisationModalComponent } from './components/modals/organisationModal/organisationModal.component';
import { FormationComponent } from './components/cores/formation/formation.component';
import { ClubComponent } from './components/cores/club/club.component';
import { SiteComponent } from './components/cores/site/site.component';



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
    MessageComponent,
    EventComponent,
    FormationComponent,
    ClubComponent,
    SiteComponent,
    CreatorModalComponent,
    DiveplaceModalComponent,
    ClubModalComponent,
    TrainingModalComponent,
    OrganisationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
