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


  private _user!: IUser;
  private _friends: any[] = [];
  private _organisations: any[] = [];
  private _users: any[] = [];

  get Users(): any[] { return this._users; }

  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _observableService: ObservableService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getOrganisation();
    this.getAllUsers();
  }

  private getUser() {
    this._session.$user.subscribe((user: IUser) => {
      this._user = user;
      setTimeout(() => {
        this.getAllFriends();
      }, 50);
     
    })
  }

  private getAllFriends() {
    this._userHttpService.getFriends(this._user.id).subscribe({
      next: (data: any[]) => {
        this._friends = data
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

  private getOrganisation() {
    this._userHttpService.getAllOrganisation().subscribe({
      next: (data: any) => {
        this._organisations = data
      },
      error: (data: any) => {
        console.log(data);
      }
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
      this._observableService.$friends.next(data);
      this._friends = data;
      this.compareConctactFriends();
    });
  }

  unlike(likedId: number) {
    this._userHttpService.unlike(this._user.id, likedId).subscribe((data: any[]) => {
      this._observableService.$friends.next(data);
      this._friends = data;
      this.compareConctactFriends();
    });

  }

  private compareConctactFriends() {
    this._users.map((contact) => {

      contact.isFriend = false
      this._friends.map((friend) => {
        if (friend.id == contact.id) {
          contact.isFriend = true;
        }
      });

      contact.organisation = []
      this._organisations.map(orga => {
        //console.log(contact.id, orga.userId)
        if (contact.id === orga.userId) {
          let obj = {
            name: orga.name,
            level: orga.level,
            refNumber: orga.refNunber,
            organisationPicture: orga.picture
          }
          contact.organisation.push(obj)
        }

      })

    });

    console.log('contacts =>', this._users);
  }
}





