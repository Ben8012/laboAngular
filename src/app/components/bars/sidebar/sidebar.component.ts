import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/interfaces/user.model';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
// import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _user! : any
  get user(): any  { return this._user; }

  private _imageUrl : any
  get ImageUrl(): any  { return this._imageUrl; }

  constructor(
    private _session : UserSessionService,
    private _route : Router,
    private _imageHttpService : ImageHttpService
    )
  {

  }

  ngOnInit(): void {
    this._session.$user.subscribe((user :any) =>{
      this._user = user;
      if(this._user.guidImage){
        this.getUserImage(user)
      }
    })

  }

  Logout(){
    this._session.clearSession();
    this._imageUrl =''
    this._route.navigate(['/home']);
  }

  
  getUserImage(user : any){
    this._imageHttpService.getProfilImage(user.guidImage).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this._imageUrl = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
    
  } 


}
