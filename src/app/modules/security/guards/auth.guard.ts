import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private user: { id: number } | null = null;

    constructor(
        private $session: SessionService<{ id: number } | null>,
        private $route : Router
    ) {
        $session.subscribe(user => this.user = user);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const roles = route.data['roles'] || [];

        if(this.user)
        {
          return true;
        }
        else {
          this.$route.navigate(['/home']);
          return false;
        }
    }

}
