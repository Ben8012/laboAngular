import { Component } from '@angular/core';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  private _user: any|null = null;

  get User():any {return this._user;}

  constructor(
   
    private _session : UserSessionService
    )
  {}

  ngOnInit() {
    this._session.$user.subscribe({
      next: (data : any) => {
          this._user = data;
      },
      error:(data :any) => {
        console.log(data);
      }
    })
   
  }
}
