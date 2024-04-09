import { IUser } from '../../../models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {


  private _user!: any;
  private _friends: any[] = [];

  get Users(): any[] { return this._users; }
  private _users: any[] = [];
  
  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
    this.compareConctactFriends();
  }

  private getUser() {
    this._session.$user.subscribe((user: IUser) => {
      this._user = user;
      console.log(user)
      this._friends = this._user.friends
    })
  }

  private getAllUsers() {
    this._userHttpService.getAllUsers().subscribe({
      next: (data: any) => {
        this._users = data.filter((d: any) => d.id != this._user.id)
        this.compareConctactFriends();
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

 
  like(likedId: number) {
    this._userHttpService.like(this._user.id, likedId).subscribe((data: any[]) => {
      this._friends = data;
      this._user = this._session.refreshUser(this._user.id)
      this.compareConctactFriends();
    });
  }

  unlike(likedId: number) {
    this._userHttpService.unlike(this._user.id, likedId).subscribe((data: any[]) => {
    this._friends = data;
    this._user = this._session.refreshUser(this._user.id)
    this.compareConctactFriends();

    });

  }

  private compareConctactFriends() {
    console.log(this._friends)
    this._users.map((contact) => {

      contact.isFriend = false
      this._friends.map((friend) => {
        if (friend.id == contact.id) {
          contact.isFriend = true;
        }
      });
    });
  }
}





