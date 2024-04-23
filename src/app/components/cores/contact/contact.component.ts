import { IUser } from '../../../models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { forEach } from 'jszip';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {


  private _user!: any; 

  get Friends(): any[] { return this._friends; }
  private _friends: any[] = [];

  get Likers(): any[] { return this._likers; }
  private _likers: any[] = [];

  get Likeds(): any[] { return this._likeds; }
  private _likeds: any[] = [];

  get Users(): any[] { return this._users; }
  private _users: any[] = [];

  
  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
  }

  private getUser() {
    this._session.$user.subscribe((user: IUser) => {
      this._user = user;
      if(this._user.id){
        this.refreshFriends()
        //console.log(user)
      }
    })
  }

  private getAllUsers() {
    this._userHttpService.getAllUsers().subscribe({
      next: (data: any) => {
        this._users = data.filter((d: any) => d.id != this._user.id)
        this.getUser()
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

  like(likedId: number) {
    this._userHttpService.like(this._user.id, likedId).subscribe((data: any[]) => {
      this._user = this._session.refreshUser(this._user.id)
      if(this._user &&this._user.id){
        this.refreshFriends();
      }
    });
  }

  unlike(likedId: number) {
    this._userHttpService.unlike(this._user.id, likedId).subscribe((data: any[]) => {
    this._user = this._session.refreshUser(this._user.id)
    if(this._user && this._user.id){
      this.refreshFriends();
    }
    });
  }

  deletelike(id : number){
    this._userHttpService.deletelike(this._user.id, id).subscribe((data: any[]) => {
      this._user = this._session.refreshUser(this._user.id)
      this.getAllUsers()
      if(this._user && this._user.id){
        this.refreshFriends();
      }
      });
  }

  private refreshFriends(){
    
    this._friends = this._user.friends
    this._likeds = this._user.likeds
    this._likers = this._user.likers
    this._users = this._users.filter((u: any) => u.id != this._user.id)
    
    this._friends.map((friend : any) => {
      this._likers = this._likers.filter((l: any) => l.id != friend.id)
      this._likeds = this._likeds.filter((l: any) => l.id != friend.id)
      this._users = this._users.filter((u: any) => u.id != friend.id)
      friend.trainings.map((training : any)=>{
        if(training.isMostLevel ==  true){
          friend.level = training.name
          friend.organisation = training.organisation.name
        }
      })
    });

    this._likeds.map((liked : any) => {
      this._users = this._users.filter((u: any) => u.id != liked.id)
      liked.trainings.map((training : any)=>{
        if(training.isMostLevel ==  true){
          liked.level = training.name
          liked.organisation = training.organisation.name
        }
      })
    });

    this._likers.map((liker : any) => {
      this._users = this._users.filter((u: any) => u.id != liker.id)
      liker.trainings.map((training : any)=>{
        if(training.isMostLevel ==  true){
          liker.level = training.name
          liker.organisation = training.organisation.name
        }
      })
    });

    this._users.map((user : any) => {
      user.trainings.map((training : any)=>{
        if(training.isMostLevel ==  true){
          user.level = training.name
          user.organisation = training.organisation.name
        }
      })
    });

  }

}





