import { IUser } from './../../models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api/api-user.service';
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

  private _contacts: any[] = [];
  get contacts(): any[] {
    return this._contacts;
  }

  constructor(
    private _apiUserService: ApiUserService,
    private _session: UserSessionService,
    private _observableService: ObservableService
  ) { }

  ngOnInit(): void {
    this._session.$user.subscribe((user: IUser) => {
      this._user = user;
      if (this._user) {
        this._observableService.$friends.subscribe((data: any[]) => {
          this._friends = data;
          console.log('friends =>', this._friends);
        });

        this._apiUserService.getAllOrganisation().subscribe((organisations: any[]) => {
          this._organisations = organisations
          console.log("organisation =>", this._organisations)
        })

        this._apiUserService.getAllUsers().subscribe((contacts: any[]) => {

          contacts.map((contact) => {

            if (contact.id !== this._user.id) {
              this.contacts.push(contact);
            }
            contact.isFriend = false
            this._friends.map((friend) => {
              if (friend.id === contact.id) {
                contact.isFriend = true;
              }
            });

            contact.organisation = []
            this._organisations.map(orga => {
              console.log(contact.id, orga.userId)
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

          console.log('contacts =>', this.contacts);
        });
      }
    });
  }

  like(likedId: number) {
    if (this._user) {
      this._apiUserService
        .like(this._user.id, likedId)
        .subscribe((data: any[]) => {
          this._observableService.$friends.next(data);
        });
    }
  }

  unlike(likedId: number) {
    if (this._user) {
      this._apiUserService
        .unlike(this._user.id, likedId)
        .subscribe((data: any[]) => {
          this._observableService.$friends.next(data);
        });
    }
  }
}
