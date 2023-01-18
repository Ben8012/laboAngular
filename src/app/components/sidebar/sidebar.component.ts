import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
// import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _user : IUser | null = null
  get user(): IUser | null { return this._user; }

  constructor( private _session : UserSessionService)
  {}

  ngOnInit(): void {
    this._session.$user?.subscribe((user :IUser | null) =>{
      this._user = user;
      //console.log(this._user)
    })

  }

  handleLogoutAction(){
    this._session.clearSession();
  }
}
