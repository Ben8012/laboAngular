import { ProfilComponent } from './modules/profil/profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'profil',
    loadChildren: () => import('./modules/profil/profil.module').then(m => m.ProfilModule)
  },
  { path: 'home',
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
  },
  { path: 'contact',
    //canActivate : [AuthGuard],
    loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)
  },
  { path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  { path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
