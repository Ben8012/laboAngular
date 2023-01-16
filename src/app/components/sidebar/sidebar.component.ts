import { Component } from '@angular/core';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
// import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public user : IUser | null = null

  constructor( private _session : UserSessionService)
   {
    this._session.user$.subscribe((user : any) => {
      this.user  = user;
    })
   }

  handleLogoutAction(){
    this._session.clearSession();
  }
}
