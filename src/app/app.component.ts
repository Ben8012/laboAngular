import { IUser } from './models/interfaces/user.model';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from './services/session/user-session.service';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { ApiUserService } from './services/api/api-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _user! : IUser
  get user(): IUser { return this._user; }

  constructor(
    private _router : Router,
    private _session : UserSessionService,
    private _apiUserService : ApiUserService
  )
  {}

  ngOnInit(): void {
     this.getUser();
  }

  private getUser(){
    let token : any = (localStorage.getItem('token') ?? null);
    //console.log(token)
    if(token != null){
      this._apiUserService.getUserByToken(JSON.parse(token)).subscribe({
        next : (user :IUser) =>{
          if(user){
            this._session.$user.next(user)
          }else{
            this._session.$user.next({}as any)
          }
        },
        error : (error) => {
          console.log(error);
        }
      })
    }else{
      this._session.$user.next({}as any)
      this._router.navigate(['home']);
    }
  }

}
