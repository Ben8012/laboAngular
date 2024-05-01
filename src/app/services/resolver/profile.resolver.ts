import { UserSessionService } from './../session/user-session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfilResolver implements Resolve<any> {

  private user: any|null = null;

    constructor(
        private $http : HttpClient,
        private _session: UserSessionService,

    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      this._session.$user.subscribe(data => {
        this.user = data
      })
      // console.log(this.user);
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.user.token}`});
      return this.$http.get<any>(`https://localhost:7022/User/`+this.user.id
      //, {headers}
      );
    }
}
