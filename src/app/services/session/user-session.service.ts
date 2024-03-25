import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { IUser } from "src/app/models/interfaces/user.model";
import { ImageHttpService } from '../http/image.http.service';


@Injectable({
    providedIn: 'root'
})
export class UserSessionService implements OnInit {

  public $user: BehaviorSubject<IUser> = new BehaviorSubject({} as any);

  constructor(
    private _router : Router,
    private _userHttpService: UserHttpService,
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

  refreshUser(id : any){
      this._userHttpService.getUserById(id).subscribe({
        next : (data :IUser) =>{
          this.saveSession(data)
          return data
        },
        error : (error) => {
          console.log(error)
        }}) ;
    }
}