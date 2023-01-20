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
        private $http : HttpClient
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      //return this.$http.get<any>(`http://localhost:3000/users/`+this.user.id);
      console.log(this.user.token);
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.user.token}`});
      return this.$http.get<any>(`https://localhost:7022/api/User/`+this.user.id, {headers});
    }
}
