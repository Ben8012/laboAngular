import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { EventComponent } from './components/cores/events/event/event.component';
import { CreatorModalComponent } from './components/modals/CreatorModal/CreatorModal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DiveplaceModalComponent } from './components/modals/diveplaceModal/diveplaceModal.component';
import { ClubModalComponent } from './components/modals/clubModal/clubModal.component';
import { TrainingModalComponent } from './components/modals/trainingModal/trainingModal.component';
import { OrganisationModalComponent } from './components/modals/organisationModal/organisationModal.component';
import { ClubComponent } from './components/cores/clubs/club/club.component';
import { SiteComponent } from './components/cores/sites/site/site.component';
import { FormEventComponent } from './components/cores/events/form-event/form-event.component';
import { FormClubComponent } from './components/cores/clubs/form-club/form-club.component';
import { ParticipatorTableComponent } from './components/view-parts/participator-table/participator-table.component';
import { VoteComponent } from './components/view-parts/vote/vote.component';
import { FormAdressComponent } from './components/view-parts/form-adress/form-adress.component';
import { FormSiteComponent } from './components/cores/sites/form-site/form-site.component';
import { FormBookComponent } from './components/cores/events/form-book/form-book.component';
import { DivelogComponent } from './components/view-parts/divelog/divelog.component';
import { AdminbarComponent } from './components/bars/adminbar/adminbar.component';
import { AdminComponent } from './components/cores/admin/admin/admin.component';
import { RoleComponent } from './components/cores/admin/role/role.component';
import { TrainingComponent } from './components/cores/admin/training/training.component';
import { AdminHomeComponent } from './components/cores/admin/admin-home/admin-home.component';
import { FormTrainingComponent } from './components/cores/admin/form-training/form-training.component';
import { FormOrganisationComponent } from './components/cores/admin/form-organisation/form-organisation.component';
import { ValidationComponent } from './components/cores/admin/validation/validation.component';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ConditionModalComponent } from './components/modals/conditionModal/conditionModal.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    AdminbarComponent,
    ContactbarComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    ProfilComponent,
    RegisterComponent,
    MessageComponent,
    EventComponent,
    ClubComponent,
    SiteComponent,
    CreatorModalComponent,
    DiveplaceModalComponent,
    ClubModalComponent,
    TrainingModalComponent,
    OrganisationModalComponent,
    FormEventComponent,
    FormClubComponent,
    ParticipatorTableComponent,
    VoteComponent,
    FormAdressComponent,
    FormSiteComponent,
    FormBookComponent,
    DivelogComponent,
    AdminComponent,
    RoleComponent,
    TrainingComponent,
    AdminHomeComponent,
    FormTrainingComponent,
    FormOrganisationComponent,
    ValidationComponent,
    ResetPasswordComponent,
    ConditionModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    FormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
