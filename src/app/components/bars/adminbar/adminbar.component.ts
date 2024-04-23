import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-adminbar',
  templateUrl: './adminbar.component.html',
  styleUrls: ['./adminbar.component.scss'],
})
export class AdminbarComponent implements OnInit {

  private _user! : any
  get User(): any { return this._user; }

  constructor(
    private _observableService: ObservableService,
    private _session : UserSessionService,
    private _userHttpService : UserHttpService,
    private _route : Router,
    private _imageHttpService : ImageHttpService
  ){ }
  
  ngOnInit(): void {
    this._session.$user.subscribe(data => {
      this._user = data
    })  
   

  }
}
