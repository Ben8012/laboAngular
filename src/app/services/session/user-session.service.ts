import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { IUser } from "src/app/models/interfaces/user.model";
import { ImageHttpService } from '../http/image.http.service';


@Injectable({
    providedIn: 'root'
})
export class UserSessionService implements OnInit {

  public $user: BehaviorSubject<IUser> = new BehaviorSubject({} as any);

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

  isUserLoggedAndAccessTokenValid(): boolean {
      if (localStorage.getItem('token')) {
        // TODO il faut verifier si le access token est valid
        return true;
      }
      this._router.navigate(['login']);
      return false;
    }

  refreshUser(id : any){
      this._userHttpService.getUserById(id).subscribe({
        next : (data :any) =>{
          data.trainings.map((training : any)=>{
            if(training.isMostLevel ==  true){
              data.level = training.name
              data.organisation = training.organisation.name
            }
          })
          this.countUserMessage(data)
          data.friends.forEach((friend : any)=> {
            this.countFriendMessages(friend,data)
            this.getFriendImage(friend)
          })
          this.saveSession(data)
        },
        error : (error) => {
          console.log(error)
        }}) ;
  }

  private countUserMessage(user :any){
    user.countMessages = 0
    user.friends.map((friend : any)=>{
      friend.messages.forEach((message:any)=> {
        if(message.reciever.id == user.id && message.isRead == false){
          user.countMessages++
        }
      })
    })
  }

  private countFriendMessages(friend : any, user :any){
    friend.countMessages = 0
    friend.messages.forEach((message:any)=> {
      if((message.reciever.id == user.id || message.sender.id == user.id) && message.isRead == false){
        friend.countMessages++
      }
    })
  }

  private getFriendImage(friend : any){
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

}