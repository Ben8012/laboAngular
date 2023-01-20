import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/interfaces/user.model';
import { ApiUserService } from '../api/api-user.service';
import { UserSessionService } from '../session/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService implements OnInit {

  private _user! : IUser

  public $friends: BehaviorSubject<any> = new BehaviorSubject( {} as any);

  constructor(
    private _session: UserSessionService,
    private _apiUserService :  ApiUserService
  ) {
    this.getFriends();
  }
  ngOnInit(): void {

  }

  private getFriends(){
    this._session.$user.subscribe((user :IUser) =>{
      this._user = user;
      if(user.id){
        this._apiUserService.getFriends(this._user.id).subscribe({
          next : (data)=>{
          this.$friends.next(data)
          console.log(data)
          },
          error : (error) =>{
            console.log(error)
          }

        })
      }
    })
  }
}
