import { IUser } from './models/interfaces/user.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { UserSessionService } from './services/session/user-session.service';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { UserHttpService } from './services/http/user.http.service';
import { ChatService } from './services/http/chat.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _phoneSize : boolean = true
  get PhoneSize() : boolean {return this._phoneSize}

  private _user! : any
  get User(): any { return this._user; }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // console.log('phoneSize: '+this._phoneSize)
    // console.log(window.innerWidth)
    this._phoneSize = window.innerWidth <= 580;
  }


  constructor(
    private _router : Router,
    private _session : UserSessionService,
    private _userHttpService : UserHttpService,
    private _chatService : ChatService
  )
  {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(){
    let token : any = (localStorage.getItem('token') ?? null);
    if(token != null){
      this._userHttpService.getUserByToken(JSON.parse(token)).subscribe({
        next : (user :any) =>{
          if(user.id){
            this._user= user
            
            this._session.saveSession(this._user)
            this._session.refreshUser(user)
          
          }else{
            this._session.$user.next({}as any)
          }
        },
        error : (error) => {
          //this._session.clearSession()
          this._session.$user.next({}as any)
          this._router.navigate(['home']);
          console.log(error);
        }
      })
    }else{
      //this._session.clearSession()
      this._session.$user.next({}as any)
      //this._router.navigate(['']);
    }
  }

 
}
