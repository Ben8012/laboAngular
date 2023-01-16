import { Component } from '@angular/core';
import { UserSessionService } from 'src/app/services/session/user-session.service';
// import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  user: { label: string } | null = null;

  constructor( private _session : UserSessionService)
   {

   }

  handleLogoutAction(){
    this._session.clearSession();
  }
}
