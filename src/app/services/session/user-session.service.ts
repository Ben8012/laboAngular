import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, from, switchMap } from "rxjs";
import { IUser } from "src/app/models/interfaces/user.model";
import { ImageHttpService } from '../http/image.http.service';


@Injectable({
    providedIn: 'root'
})
export class UserSessionService implements OnInit {

  public $user: BehaviorSubject<IUser> = new BehaviorSubject({} as any);

  get User(): any {
    return this.$user.value;
  }

  constructor(
    private _router : Router,
    private _userHttpService: UserHttpService,
    private _imageHttpService : ImageHttpService
    )
  {}


  ngOnInit(): void {
  }

  saveSession(user: any) {
      localStorage.clear();
      localStorage.setItem('token', JSON.stringify(user.token))
      this.$user.next(user);
  }

  clearSession() {
      localStorage.clear()
      this.$user.next({} as any)
  }

  isUserConnected():boolean{
    if(this.User.token != ''){
      // TODO il faut verifier si le access token est valid
      return true
    }
    this._router.navigate(['']);
    return false;
  }

  isUserAdmin():boolean{
    if(this.User.role == 'admin' || this.User.role == 'super admin'){
      return true
    }
    this._router.navigate(['']);
    return false;
  }

  isUserSuperAdmin():boolean{
    if(this.User.role == 'super admin'){
      return true
    }
    this._router.navigate(['']);
    return false;
  }

  refreshUser(user : any){
      this._userHttpService.getUserById(user.id).subscribe({
        next : (data :any) =>{
          data.token = user.token
          data.trainings.map((training : any)=>{
            if(training.isMostLevel ==  true){
              data.level = training.name
              data.organisation = training.organisation.name
            }
          })
          this.CountUserMessage(data)
          data.friends.forEach((friend : any)=> {
            this.CountFriendMessages(friend,data)
            this.GetFriendImage(friend)
          })
          this.saveSession(data)
        },
        error : (error) => {
          console.log(error)
        }}) ;
  }

  CountUserMessage(user :any){
    user.countMessages = 0
    user.friends.map((friend : any)=>{
      friend.messages.forEach((message:any)=> {
        if(message.reciever.id == user.id && message.isRead == false){
          user.countMessages++
        }
      })
    })
  }

  CountFriendMessages(friend : any, user :any){
    friend.countMessages = 0
    friend.messages.forEach((message:any)=> {
      if(message.reciever.id == user.id  && message.isRead == false){
        friend.countMessages++
      }
    })
  }

  GetFriendImage(friend : any){
    if(friend.guidImage != ''){
      this._imageHttpService.getProfilImage(friend.guidImage).subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          friend.imageUrl = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
  }

  GetUserImage(user:any){
    this._imageHttpService.getProfilImage(user.guidImage).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        user.imageProfil = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
  }

  ReturnUserImage(user:any) {
    this._imageHttpService.getProfilImage(user.guidImage).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let imageProfil = e.target.result;
        return imageProfil
      }
      reader.readAsDataURL(imageData);
    });
  }

}