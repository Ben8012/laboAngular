import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { UserHttpService } from '../http/user.http.service';

@Injectable({
    providedIn: 'root'
  })
  export class ResetPasswordGuardService implements CanActivate{
  
    constructor(
          private _httpUser: UserHttpService,

    ) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    let token = route.paramMap.get('token')
    // console.log(token)
    return this.getUser(token);
    }

    getUser(token : any) : any{
     this._httpUser.getUserByToken(token).subscribe({
      next: (data: any) => {
        if(data.token){
          
            return true
        }
        else{
            return false
        }
      },
      error: (data: any) => {
        console.log(data)
        return false;
      }
    })
    }
  }