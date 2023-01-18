import { ApiContactService } from './../../services/api/api-contact.services';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { IUser } from '../../models/interfaces/user.model';
import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api/api-user.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private _user : IUser | null = null
  get user(): IUser | null { return this._user; }

  private _contacts: any[] = [];
  get contacts(): any[] { return this._contacts; }

  constructor(
    private _apiUserService : ApiUserService,
    private _session : UserSessionService
  )
  {}

  ngOnInit(): void {
    this._session.$user?.subscribe((user :IUser | null) =>{
      this._user = user;
      console.log(this._user)
    })

    if(this._user){
      this._apiUserService.getAllUsers().subscribe((contacts : any[])=>{
          contacts.map(contact => {
              if(contact.id != this._user?.id){
                this.contacts.push(contact)
              }
          })
          console.log(this.contacts)
      })
    }

  }

  like(likedId : number) {
    if(this._user){
      this._apiUserService.like(this._user.id , likedId);
    }
  }


}
