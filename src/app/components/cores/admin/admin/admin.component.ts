import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _session: UserSessionService,
    private _router : Router,
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
        this._users = data
        this.addLevelToView(this._users)
        console.log(this._users)
      },
      error: (data: any) => {
        console.log(data);
      }
    })
  }

  role(id: number) {
    this._router.navigate(['admin-home/validation/',id])
  }


  private addMostLevel(elements :any){
    elements.map((element : any) => {
      if(element.trainings){
        element.trainings.map((training : any)=>{
          if(training.isMostLevel ==  true){
            element.level = training.name
            element.organisation = training.organisation.name
          }
        })
      }
    });
   }

   private addLevelToView(users :any){
    console.log('ici')
    users.forEach((user : any) => {
      user.trainings.forEach((training : any) =>{
        if(training.isMostLevel == true){
          user.level = training.name
          user.organisation = training.organisation.name
        }
      });
      this.addMostLevel(user.friends)
      this.addMostLevel(user.likeds)
      this.addMostLevel(user.likers)
    });
   }
}
