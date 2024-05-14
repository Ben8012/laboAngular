import { IUser } from './models/interfaces/user.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { UserSessionService } from './services/session/user-session.service';
import { Router } from '@angular/router';
import { interval, isEmpty, startWith, switchMap } from 'rxjs';
import { UserHttpService } from './services/http/user.http.service';
import { ChatService } from './services/http/chat.http.service';
import { EventHttpService } from './services/http/event.http.servive';
import { ImageHttpService } from './services/http/image.http.service';
import { ObservableService } from './services/observable/observable.service';
import { DateHelperService } from './services/helper/date.helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _phoneSize : boolean = false
  get PhoneSize() : boolean {return this._phoneSize}

  private _user! : any
  get User(): any { return this._user; }

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "";

  

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
    private _chatService : ChatService,
    private _observableService : ObservableService
  )
  {}

  ngOnInit(): void {
    this._phoneSize = window.innerWidth <= 580
    this.getUser();
    this._observableService.getAllClubs();
    this._observableService.getAllEvents();
    // // Démarrez l'intervalle toutes les 2 minutes (120000 millisecondes)
    //this.refreshDatas()
  }

  private refreshDatas(){
    setTimeout(() => {
      this._observableService.refreshViews()
    // Répétez l'appel toutes les 2 minutes
    this.refreshDatas()
    }, 120000);
  }

  private getUser(){
    let token : any = (localStorage.getItem('token') ?? null);
    if(token != null){
      try {
        token = JSON.parse(token)
      } 
      catch (erreur) {
        this._session.clearSession()
        this._chargingPageMessage = ""
        this._router.navigate(['']);
        console.clear()
        console.error("Echec (2) de la connexion connexion...", erreur);
      }
      
      this._chargingPageMessage ="Connexion à votre compte en cours ..."
        this._userHttpService.getUserByToken(token).subscribe({
          next : (user :any) =>{
            if(user.id){
              this._chatService.connection()
              this._user= user
              this._session.saveSession(this._user)
              this._observableService.getAllSiteAndVote(user);
              this._session.getAllUsers()
              this._chargingPageMessage =""
            }else{
              this._observableService.getAllSite();
              this._session.$user.next({}as any)
            }
          },
          error : (error) => {
            //this._session.clearSession()
            this._chargingPageMessage = ""
            this._router.navigate(['']);
            console.clear()
            console.error("Echec (1) de la connexion connexion ...",error);
          }
        })
      
    }else{
      this._observableService.getAllSite();
    }
  }
}
