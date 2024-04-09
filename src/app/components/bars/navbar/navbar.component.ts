import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private _user! : any
  get User(): any  { return this._user; }

  constructor(
    private _session : UserSessionService,
  
    )
  {

  }

  ngOnInit(): void {
    this._session.$user.subscribe((user :any) =>{
      this._user = user;
    })
  }

}
