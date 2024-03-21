import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserHttpService } from '../http/user.http.service';
import { UserSessionService } from '../session/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService implements OnInit {

  public $friends: BehaviorSubject<any> = new BehaviorSubject( {} as any);

  constructor(
  ) {}

  ngOnInit(): void {

  }

  saveFriend(friend: any) {
    this.$friends.next(friend);
  }

  clearFriends(){
    this.$friends.next({} as any)
  }

}
