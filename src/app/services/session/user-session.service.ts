import { UserHttpService } from 'src/app/services/http/user.http.service';
import jwt_decode , { JwtPayload } from "jwt-decode";

import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { IUser } from "src/app/models/interfaces/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserSessionService implements OnInit {

  public $user: BehaviorSubject<IUser> = new BehaviorSubject({} as any);

  constructor(
    private _router : Router,
    )
  {}


  ngOnInit(): void {
  }

  saveSession(user: IUser) {
      localStorage.clear();
      localStorage.setItem('token', JSON.stringify(user.token))
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