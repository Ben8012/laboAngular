import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/services/http/user.http.service';
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
        this._users = data.filter((d: any) => d.id != this._user.id)
        this.getUser()
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

  role(id: number) {
    console.log(id)
    // this._userHttpService.like(this._user.id, likedId).subscribe((data: any[]) => {
    //   this._user = this._session.refreshUser(this._user.id)
    //   if(this._user &&this._user.id){
    //     this.refreshFriends();
    //   }
    // });
  }
}
