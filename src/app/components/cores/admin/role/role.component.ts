
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
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers()
  }

  private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      if (this._user.id) {
        //console.log(user)
      }
    })
  }

  private getAllUsers() {
    this._userHttpService.getAllUsers().subscribe({
      next: (data: any) => {
        this._users = data.filter((u: any) => u.role != 'super admin')
        this.addLevelToView(this._users)
        console.log(this._users)
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

  admin(id: number) {
    this._userHttpService.admin(id).subscribe({
      next: (data: any) => {
        this.getAllUsers()
      },
      error: (data: any) => {
        console.log(data);
      }
    });
  }

  unadmin(id: number) {
    this._userHttpService.unadmin(id).subscribe({
      next: (data: any) => {
        this.getAllUsers()
      },
      error: (data: any) => {
        console.log(data);
      }
    });
  }

  private addMostLevel(elements: any) {
    elements.map((element: any) => {
      if (element.trainings) {
        element.trainings.map((training: any) => {
          if (training.isMostLevel == true) {
            element.level = training.name
            element.organisation = training.organisation.name
          }
        })
      }
    });
  }

  private addLevelToView(users: any) {
    users.forEach((user: any) => {
      if (user.trainings) {
        user.trainings.forEach((training: any) => {
          if (training.isMostLevel == true) {
            user.level = training.name
            user.organisation = training.organisation.name
          }
        });

      }
      this.addMostLevel(user.friends)
      this.addMostLevel(user.likeds)
      this.addMostLevel(user.likers)
    });
  }
}