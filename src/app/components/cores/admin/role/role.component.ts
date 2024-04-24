
import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {


  private _user!: any; 

  get Users(): any[] { return this._users; }
  private _users: any[] = [];

  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService
  ) {}

  ngOnInit(): void {
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
    this._userHttpService.getAllUsers().subscribe({
      next: (data: any) => {
        this._users = data.filter((u: any) => u.role != 'super admin' )
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

  admin(id: number) {
    console.log(id)
    // this._userHttpService.like(this._user.id, likedId).subscribe((data: any[]) => {
    //   this._user = this._session.refreshUser(this._user.id)
    //   if(this._user &&this._user.id){
    //     this.refreshFriends();
    //   }
    // });
  }

  unadmin(id: number) {
    console.log(id)
    // this._userHttpService.like(this._user.id, likedId).subscribe((data: any[]) => {
    //   this._user = this._session.refreshUser(this._user.id)
    //   if(this._user &&this._user.id){
    //     this.refreshFriends();
    //   }
    // });
  }
}