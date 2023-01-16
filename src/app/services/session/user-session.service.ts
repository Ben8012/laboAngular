import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import jwt_decode from 'jwt-decode';
import { IUser } from "src/app/models/interfaces/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserSessionService {

    public user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({}as any);


    constructor(
        private router : Router
    ) {

        const token = sessionStorage.getItem('token')

        if (token) {
            const data: any = jwt_decode(token);

            this.user$.next(data);
        }
    }

    saveSession(user: IUser) {
        sessionStorage.setItem('token', JSON.stringify(user.token))
        //sessionStorage.setItem('name', JSON.stringify(user.firstname))
        //const token: string = jwt_decode(user.token);
        this.user$.next(user);
        // this.user$.subscribe((data : IUser)=> {
        //   console.log(data)
        // })

    }

    clearSession() {
        sessionStorage.clear()
        this.user$.next({} as any)
    }

    isUserLoggedAndAccessTokenValid(): boolean {
        if (sessionStorage.getItem('token')) {
          // TODO il faut verifier si le access token est valid
          return true;
        }
        this.router.navigate(['login']);
        return false;
      }

}