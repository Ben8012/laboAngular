import { ApiUserService } from 'src/app/services/api/api-user.service';
import jwt_decode from "jwt-decode";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { IUser } from "src/app/models/interfaces/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserSessionService {

  public $user: BehaviorSubject<IUser> = new BehaviorSubject({} as any);

    private user()   {
      const id = Number(localStorage.getItem('id'))
      console.log(id)
      if(id){
        this._apiUserService.getUserById(id).subscribe((user : IUser)=> {
          this.$user.next(user)
        })
      }else{
        this.$user.next({} as any)
      }
    }



    constructor(
      private _router : Router,
      private _apiUserService : ApiUserService
      )
    {
      this.user()
    }

    saveSession(user: IUser) {
        localStorage.setItem('token', JSON.stringify(user.token))
        localStorage.setItem('id', JSON.stringify(user.id))
        this.$user.next(user);
    }

    clearSession() {
        localStorage.clear()
        this.$user.next({} as any)
    }

    isUserLoggedAndAccessTokenValid(): boolean {
        if (localStorage.getItem('token')) {
          // TODO il faut verifier si le access token est valid
          return true;
        }
        this._router.navigate(['login']);
        return false;
      }

}