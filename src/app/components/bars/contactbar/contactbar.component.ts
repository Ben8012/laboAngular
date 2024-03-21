
import { isEmpty } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contactbar',
  templateUrl: './contactbar.component.html',
  styleUrls: ['./contactbar.component.scss']
})
export class ContactbarComponent implements OnInit {

  private _friends : any [] = []
  get Friends(): any []  { return this._friends; }

  private _user! : any
  get User(): any { return this._user; }

  constructor(
    private _observableService: ObservableService,
    private _session : UserSessionService,
    private _userHttpService : UserHttpService,
    private _route : Router
  ){ }

  ngOnInit(): void {
      this._session.$user.subscribe(data => {
        this._user = data
        this._friends = this._user.friends
      })  
  }

  getMessage(id : any){
    this._route.navigate(['/message', id]);
  }



}
