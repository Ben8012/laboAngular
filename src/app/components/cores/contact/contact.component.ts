import { IUser } from '../../../models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { forEach } from 'jszip';
import { ChatService } from 'src/app/services/http/chat.http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {


  get User(): any{ return this._user; }
  private _user: any; 

  get Friends(): any[] { return this._friends; }
  private _friends: any[] = [];

  get Likers(): any[] { return this._likers; }
  private _likers: any[] = [];

  get Likeds(): any[] { return this._likeds; }
  private _likeds: any[] = [];

  get Users(): any[] { return this._users; }
  private _users: any[] = [];

  private _allUsers: any[] = [];

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Page en chargement ...";

  
  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _chatService : ChatService
  ) { }

  ngOnInit(): void {
    this._session.getAllUsers()
    this.getUser();
    this.getAllUsers()
  }

  private getUser() {
    this._session.$user.subscribe((user: any) => {
        this._user = user;
        this._likeds = user.likeds
        this._likers = user.likers
        this._friends = user.friends
        this._users = user.contacts
        if( user.contacts && user.contacts.length > 0 ){
          this._chargingPageMessage= ""
        }
    })
  }

  private getAllUsers(){
    this._session.$users.subscribe((users: any) => {
      if(users && users.length>0){
        this._allUsers = users;
        
      }
    })
  }



  like(liked: any) {
    liked.hiddenButtons = true
    this._userHttpService.like(this._user.id, liked.id).subscribe((data: any) => {
      this._session.refreshUser(this._user)
    });
  }

  unlike(liked: any) {
    liked.hiddenButtons = true
    this._userHttpService.unlike(this._user.id, liked.id).subscribe((data: any) => {
    this._session.refreshUser(this._user)
    });
  }

  deletelike(user : any){
    user.hiddenButtons = true
    this._userHttpService.deletelike(this._user.id, user.id).subscribe((data: any) => {
      this._session.refreshUser(this._user)
      });
  }

  

}





