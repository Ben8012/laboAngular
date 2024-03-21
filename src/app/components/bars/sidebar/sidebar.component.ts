import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
// import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _user! : IUser
  get user(): IUser  { return this._user; }

  constructor(
    private _session : UserSessionService,
    private _route : Router,
    )
  {

  }

  ngOnInit(): void {
    this._session.$user.subscribe((user :IUser) =>{
      this._user = user;
    })

  }

  Logout(){
    this._session.clearSession();
    this._route.navigate(['/home']);
  }


}
