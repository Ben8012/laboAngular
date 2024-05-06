import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/interfaces/user.model';
import { ChatService } from 'src/app/services/http/chat.http.service';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { MessageHttpService } from 'src/app/services/http/message.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
// import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() IsPhoneSize: any;

  private _isContactBarVisible : boolean = false
  get IsContactBarVisible() : boolean {return this._isContactBarVisible}

  private _user! : any
  get User(): any  { return this._user; }

  private _userImage : any
  get UserImage(): any  { return this._userImage; }

  
  constructor(
    private _session : UserSessionService,
    )
  {}

  ngOnInit(): void {
    this._session.$user.subscribe((user :any) =>{
      this._user = user;
      if(this._user.guidImage){
        //this._userImage =this._session.ReturnUserImage(this._user)
        //this._session.GetUserImage(this._user)
      }
    })
  }

  contactBarVisibility(){
    this._isContactBarVisible = !this._isContactBarVisible
  }

  event(message: string) {
    if(message == 'hidden'){
      this._isContactBarVisible = false
    }
  }

}
