import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, from, switchMap } from "rxjs";
import { IUser } from "src/app/models/interfaces/user.model";
import { ImageHttpService } from '../http/image.http.service';
import { ObservableService } from '../observable/observable.service';
import { DateHelperService } from '../helper/date.helper.service';


@Injectable({
    providedIn: 'root'
})
export class UserSessionService implements OnInit {

  public $user: BehaviorSubject<IUser> = new BehaviorSubject({} as any);
  public $users: BehaviorSubject<IUser> = new BehaviorSubject({} as any);


  get User(): any {
    return this.$user.value;
  }

  get Users(): any {
    return this.$users.value;
  }  

  private _users : any




  constructor(
    private _router : Router,
    private _userHttpService: UserHttpService,
    private _imageHttpService : ImageHttpService,
    private _dateHelperService : DateHelperService,
    )
  {}


  ngOnInit(): void {
    
  }

  saveSession(data: any) {
    localStorage.clear();
    localStorage.setItem('token', JSON.stringify(data.token))
    

    data.trainings.map((training : any)=>{
      if(training.isMostLevel ==  true){
        data.level = training.name
        data.organisation = training.organisation.name
      }
    })
   
    this.$user.next(data);
    this.getUserImage(data)
    this.countUserMessage(data)
    data.friends.forEach((friend : any)=> {
      this.countFriendMessages(friend,data)
      this.getFriendImage(friend)
    })

    this.$user.next(data);
    console.log('user chargé')
    //console.log(data)
  }

  clearSession() {
      localStorage.clear()
      //this.$users.next({} as any)
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
          this.filterConatcatsForView(data, this._users)
          this.saveSession(data)
        },
        error : (error) => {
          console.log(error)
        }}) ;
  }

  getAllUsers() {
    this._userHttpService.getAllUsers().subscribe({
      next: (users: any) => {
        if(users && users.length > 0){
          this.addMostLevel(users)
          this._users = users
          this.filterConatcatsForView(this.User,users)
          this.$users.next(users);
          console.log('contacts chargés')
          //this.getAllUsersBehevior()
        }
      },
      error: (data: any) => {
        console.log(data);
      }
    })
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

  private countUserMessage(user :any){
    user.countMessages = 0
    user.friends.map((friend : any)=>{
      friend.hiddenButtons = false
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
      message.createdAt = this._dateHelperService.formatDateToFrench(new Date(message.createdAt))
      if(message.reciever.id == user.id  && message.isRead == false){
        friend.countMessages++
      }
    })
  }

  private getFriendImage(friend : any){
    if(friend.guidImage != null){
      this._imageHttpService.getImage(friend.id,"ProfilImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          friend.imageUrl = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
  }

  private getUserImage(user:any){
    if(user.guidImage != null){
      this._imageHttpService.getImage(user.id,"ProfilImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          user.imageProfil = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(user.guidLevel != null){
      this._imageHttpService.getImage(user.id,"LevelImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          user.imageLevel = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(user.guidCertificat != null){
      this._imageHttpService.getImage(user.id,"CertificatImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          user.imageCertificat = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(user.guidInsurance != null){
      this._imageHttpService.getImage(user.id,"InsuranceImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          user.imageInsurance = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
  }

  private filterConatcatsForView(user:any, allUsers :any){
    //console.log(allUsers)
    if(allUsers.length > 0){
      allUsers.map((user : any) => {
        user.chargingMessage=""
        user.hiddenButtons = false
      });
  
      allUsers = allUsers.filter((u: any) => u.id != user.id)
      
      user.friends.map((friend : any) => {
        user.likeds = user.likeds.filter((l: any) => l.id != friend.id)
        user.likers = user.likers.filter((l: any) => l.id != friend.id)
  
        allUsers = allUsers.filter((u: any) => u.id != friend.id)
        friend.trainings.map((training : any)=>{
          if(training.isMostLevel ==  true){
            friend.level = training.name
            friend.organisation = training.organisation.name
          }
        })
        friend.chargingMessage=""
        friend.hiddenButtons = false
      });
  
      user.likeds.map((liked : any) => {
        allUsers = allUsers.filter((u: any) => u.id != liked.id)
        liked.trainings.map((training : any)=>{
          if(training.isMostLevel ==  true){
            liked.level = training.name
            liked.organisation = training.organisation.name
          }
        })
        liked.chargingMessage=""
        liked.hiddenButtons = false
      });
  
      user.likers.map((liker : any) => {
        allUsers = allUsers.filter((u: any) => u.id != liker.id)
        liker.trainings.map((training : any)=>{
          if(training.isMostLevel ==  true){
            liker.level = training.name
            liker.organisation = training.organisation.name
          }
        })
        liker.chargingMessage=""
        liker.hiddenButtons = false
      });
  
      user.contacts = allUsers
      //console.log(user)
      this.$user.next(user)

    }
  }



}