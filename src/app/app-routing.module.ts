import { ProfilResolver } from './services/resolver/profile.resolver';
import { ProfilComponent } from './components/user/profil/profil.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/cores/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { ContactComponent } from './components/cores/contact/contact.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EventComponent } from './components/cores/events/event/event.component';
import { ClubComponent } from './components/cores/clubs/club/club.component';
import { SiteComponent } from './components/cores/sites/site/site.component';
import { MessageComponent } from './components/cores/message/message.component';
import { FormEventComponent } from './components/cores/events/form-event/form-event.component';
import { FormClubComponent } from './components/cores/clubs/form-club/form-club.component';
import { FormSiteComponent } from './components/cores/sites/form-site/form-site.component';
import { FormBookComponent } from './components/cores/events/form-book/form-book.component';
import { AdminComponent } from './components/cores/admin/admin/admin.component';
import { TrainingComponent } from './components/cores/admin/training/training.component';
import { RoleComponent } from './components/cores/admin/role/role.component';
import { AdminHomeComponent } from './components/cores/admin/admin-home/admin-home.component';
import { FormTrainingComponent } from './components/cores/admin/form-training/form-training.component';
import { FormOrganisationComponent } from './components/cores/admin/form-organisation/form-organisation.component';
import { ValidationComponent } from './components/cores/admin/validation/validation.component';
import { UserGuardService } from './services/guard/user-guard.service';
import { AdminGuardService } from './services/guard/admin-guard.service';
import { SuperAdminGuardService } from './services/guard/super-admin-guard.service';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ResetPasswordGuardService } from './services/guard/reset-password-guard.service';

const routes: Routes = [
  { path: '', component : HomeComponent},
  { path: 'profil', component : ProfilComponent, canActivate : [UserGuardService]},
  { path: 'login', component : LoginComponent},
  // { path: 'register', component : RegisterComponent},

  { path: 'event', component : EventComponent},
  { path: 'my-events', component : EventComponent, canActivate : [UserGuardService]},
  { path: 'formation', component : EventComponent},

  { path: 'club', component : ClubComponent},
  { path: 'my-clubs', component : ClubComponent, canActivate : [UserGuardService]},

  { path: 'site', component : SiteComponent},
  { path: 'insert-site', component : FormSiteComponent , canActivate : [AdminGuardService]},
  { path: 'update-site/:id', component : FormSiteComponent , canActivate : [AdminGuardService]},

  { path: 'contact', component : ContactComponent, canActivate : [UserGuardService]},
  { path: 'message/:id', component : MessageComponent , canActivate : [UserGuardService]},

  { path: 'update-event/:id', component : FormEventComponent, canActivate : [UserGuardService]},
  { path: 'insert-event', component : FormEventComponent , canActivate : [UserGuardService]},

  { path: 'update-club/:id', component : FormClubComponent, canActivate : [UserGuardService]},
  { path: 'insert-club', component : FormClubComponent, canActivate : [UserGuardService]},

  { path: 'my-book', component : EventComponent, canActivate : [UserGuardService]},
  { path: 'update-book/:id', component : FormBookComponent , canActivate : [UserGuardService]},
  { path: 'insert-book/:id', component : FormBookComponent, canActivate : [UserGuardService]},

  {path : 'reset-password/:token', component : ResetPasswordComponent },
  // ,canActivate : [ResetPasswordGuardService]

  { path: 'admin-home', component : AdminHomeComponent, canActivate : [AdminGuardService],
    children:[
      { path: 'admin-site', component : SiteComponent},
 
      { path: 'training', component : TrainingComponent},
      { path: 'insert-training/:id', component : FormTrainingComponent},
      { path: 'update-training/:id', component : FormTrainingComponent},
      { path: 'insert-organisation', component : FormOrganisationComponent},
      { path: 'update-organisation/:id', component : FormOrganisationComponent},

      { path: 'role', component : RoleComponent, canActivate : [SuperAdminGuardService]},
      { path: 'admin', component : AdminComponent},
      { path: 'validation/:id', component : ValidationComponent},

    ]
  },
  
  { path: '**', component : HomeComponent},

];

// const routerOptions: ExtraOptions = {
//   onSameUrlNavigation: 'reload' // Cette ligne force le rafraîchissement de la page si l'URL est la même mais que les paramètres changent
// };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
