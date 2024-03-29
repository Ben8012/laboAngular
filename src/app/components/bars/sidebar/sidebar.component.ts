import { Component, HostListener, Input, OnInit } from '@angular/core';
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

  @Input() PhoneSize : boolean = false

  private _message : string = ''
  get Message() : string {return this._message}

  private _isContactBarVisible : boolean = false
  get IsContactBarVisible() : boolean {return this._isContactBarVisible}

  private _user! : any
  get user(): any  { return this._user; }

  private _imageUrl : any
  get ImageUrl(): any  { return this._imageUrl; }

  constructor(
    private _session : UserSessionService,
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

  getUserImage(user : any){
    this._imageHttpService.getProfilImage(user.guidImage).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this._imageUrl = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
    
  } 
 
  contactBarVisibility(){
    console.log(this._isContactBarVisible)
    this._isContactBarVisible = !this._isContactBarVisible
   
  }

  event(message: string) {
    if(message == 'hidden'){
      this._isContactBarVisible = false
    }
    
  }

}
