import { ProfilResolver } from './services/resolver/profile.resolver';
import { ProfilComponent } from './components/user/profil/profil.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/cores/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { ContactComponent } from './components/cores/contact/contact.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EventComponent } from './components/cores/events/event/event.component';
import { FormationComponent } from './components/cores/events/formation/formation.component';
import { ClubComponent } from './components/cores/clubs/club/club.component';
import { SiteComponent } from './components/cores/site/site.component';
import { MessageComponent } from './components/cores/message/message.component';
import { MyEventsComponent } from './components/cores/events/my-events/my-events.component';
import { FormEventComponent } from './components/cores/events/form-event/form-event.component';
import { FormClubComponent } from './components/cores/clubs/form-club/form-club.component';
import { MyClubsComponent } from './components/cores/clubs/my-clubs/my-clubs.component';

const routes: Routes = [
  { path: '', component : HomeComponent},
  { path: 'profil', component : ProfilComponent},
  { path: 'login', component : LoginComponent},
  { path: 'register', component : RegisterComponent},

  { path: 'event', component : EventComponent},
  { path: 'my-events', component : EventComponent},
  { path: 'formation', component : EventComponent},
  { path: 'club', component : ClubComponent},
  { path: 'site', component : SiteComponent},
  { path: 'contact', component : ContactComponent},
  { path: 'message/:id', component : MessageComponent},


  { path: 'update-event/:id', component : FormEventComponent},
  { path: 'insert-event', component : FormEventComponent},

  { path: 'my-clubs', component : MyClubsComponent},
  { path: 'update-club/:id', component : FormClubComponent},
  { path: 'insert-club', component : FormClubComponent},
  
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
