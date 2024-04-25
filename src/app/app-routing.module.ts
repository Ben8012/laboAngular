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

const routes: Routes = [
  { path: '', component : HomeComponent},
  { path: 'profil', component : ProfilComponent},
  { path: 'login', component : LoginComponent},
  { path: 'register', component : RegisterComponent},

  { path: 'event', component : EventComponent},
  { path: 'my-events', component : EventComponent},
  { path: 'formation', component : EventComponent},

  { path: 'club', component : ClubComponent},
  { path: 'my-clubs', component : ClubComponent},

  { path: 'site', component : SiteComponent},
  { path: 'insert-site', component : FormSiteComponent},
  { path: 'update-site/:id', component : FormSiteComponent},

  { path: 'contact', component : ContactComponent},
  { path: 'message/:id', component : MessageComponent},

  { path: 'update-event/:id', component : FormEventComponent},
  { path: 'insert-event', component : FormEventComponent},

  
  { path: 'update-club/:id', component : FormClubComponent},
  { path: 'insert-club', component : FormClubComponent},

  { path: 'my-book', component : EventComponent},
  { path: 'update-book/:id', component : FormBookComponent},
  { path: 'insert-book/:id', component : FormBookComponent},

  { path: 'admin-home', component : AdminHomeComponent,
    children:[
      { path: 'site', component : SiteComponent},
 

      { path: 'training', component : TrainingComponent},
      { path: 'insert-training', component : FormTrainingComponent},
      { path: 'update-training/:id', component : FormTrainingComponent},
      { path: 'insert-organisation', component : FormOrganisationComponent},
      { path: 'update-organisation/:id', component : FormOrganisationComponent},

      { path: 'role', component : RoleComponent},
      { path: 'admin', component : AdminComponent},
      { path: 'validation/:id', component : ValidationComponent},

    ]
  },
  
  { path: '**', component : HomeComponent},

];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload' // Cette ligne force le rafraîchissement de la page si l'URL est la même mais que les paramètres changent
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
