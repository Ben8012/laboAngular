import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
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

  private _phoneSize : boolean = true
  get IsPhoneSize() : boolean {return this._phoneSize}

  @HostListener('window:resize', ['$event'])
  onResize() {
    // console.log('phoneSize: '+this._phoneSize)
    // console.log(window.innerWidth)
    this._phoneSize = window.innerWidth <= 580;
  }


  constructor(
    private _session : UserSessionService,
  ){ }
  
  ngOnInit(): void {
    this._phoneSize = window.innerWidth <= 580
    this._session.$user.subscribe(data => {
      this._user = data
    })  
   

  }
}
