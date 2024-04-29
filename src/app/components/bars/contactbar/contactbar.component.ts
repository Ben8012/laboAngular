
import { isEmpty } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Router } from '@angular/router';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { MessageHttpService } from 'src/app/services/http/message.http.service';



@Component({
  selector: 'app-contactbar',
  templateUrl: './contactbar.component.html',
  styleUrls: ['./contactbar.component.scss']
})
export class ContactbarComponent implements OnInit {
  @Input() PhoneSize : boolean = false

  @Output() HiddenContactBar: EventEmitter<string> = new EventEmitter<string>();
  
  private _friends : any [] = []
  get Friends(): any []  { return this._friends; }

  private _user! : any
  get User(): any { return this._user; }

  constructor(
    private _observableService: ObservableService,
    private _session : UserSessionService,
    private _userHttpService : UserHttpService,
    private _route : Router,
    private _imageHttpService : ImageHttpService,
  ){ }

  ngOnInit(): void {
      this._session.$user.subscribe(data => {
        this._user = data
        this._friends = this._user.friends
       //console.log(this._friends)
      })  
  }

  getMessage(id : any){
    this.HiddenContactBar.emit('hidden');
    this._session.refreshUser(this._user.id)
    this._route.navigate(['/message', id]);
  }

  close(){
    this.HiddenContactBar.emit('hidden');
  }

}
