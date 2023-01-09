import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil.component';
import {ProfilResolver} from './resolvers/profile.resolver'

const routes: Routes = [{ path: '', component: ProfilComponent, resolve:{'profile': ProfilResolver} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
