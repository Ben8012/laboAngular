import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  private _user!: any; 

  get Users(): any[] { return this._users; }
  private _users: any[] = [];

  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _router : Router,

  ) {}

  ngOnInit(): void {
    this._session.getAllUsers()
    this.getUser();
   this.getAllUsers()
  }

  private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      if(this._user.id){
        //console.log(user)
      }
    })
  }

  private getAllUsers() {
    this._session.$users.subscribe((users: any) => {
      if(users && users.length > 0){
        //console.log(users)
        this._users = users;
      }
      
    })
    // this._userHttpService.getAllUsers().subscribe({
    //   next: (data: any) => {
    //     this._users = data
    //     this.addLevelToView(this._users)
    //     // console.log(this._users)
    //   },
    //   error: (data: any) => {
    //     console.log(data);
    //   }
    // })
  }

  role(id: number) {
    this._router.navigate(['admin-home/validation/',id])
  }

}
