import { Component, Input, OnInit } from '@angular/core';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() IsPhoneSize: any;

  private _user! : any
  get User(): any  { return this._user; }

  private _users! : any
  get Users(): any  { return this._users; }

  private _sites : any [] = []
  get Sites(): any []  { return this._sites; }

  private _clubs : any [] = []
  get Clubs(): any []  { return this._clubs; }

  private _events : any [] = []
  get Events(): any []  { return this._events; }

  constructor(
    private _session : UserSessionService,
    private _observableService : ObservableService
    )
  {

  }

  ngOnInit(): void {
    this._session.$user.subscribe((user :any) =>{
      this._user = user;
    })
    this.getSites()
  }

  private getSites() {
    this._observableService.$sites.subscribe({
      next : (sites :any) =>{
        //console.log(sites)
        if(sites && sites.length > 0){
          this._sites = sites
          
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
    }

    getAllClubs(){
      this._observableService.$clubs.subscribe((clubs: any) => {
       if(clubs && clubs.length > 0){
          this._clubs = clubs
        }  
      })
     }

     getAllEvents(){
      this._observableService.$events.subscribe((events: any) => {
       if(events && events.length > 0){
          this._events = events
        }  
      })
     }

     getAllUsers(){
      this._session.$users.subscribe((users: any) => {
       if(users && users.length > 0){
          this._users = users
        }  
      })
     }

}
