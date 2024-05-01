
import { isEmpty } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { Router } from '@angular/router';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { MessageHttpService } from 'src/app/services/http/message.http.service';
import { ChatService } from 'src/app/services/http/chat.http.service';



@Component({
  selector: 'app-contactbar',
  templateUrl: './contactbar.component.html',
  styleUrls: ['./contactbar.component.scss']
})
export class ContactbarComponent implements OnInit {
  @Input() PhoneSize : boolean = false

  @Output() HiddenContactBar: EventEmitter<string> = new EventEmitter<string>();
  
  private _friends : any [] = []
  get Friends(): any []  { return this._friends; }

  private _user! : any
  get User(): any { return this._user; }

  private _isRead : any ={
    FriendId: null,
    UserId : null,
  }

  constructor(
    private _session : UserSessionService,
    private _messageHttpService : MessageHttpService,
    private _route : Router,
    private _chatService : ChatService

  ){ }

  ngOnInit(): void {
   
    this._chatService.myHub.on("MessageReaded", (message : any) => {
      if(message.friendId == this._user.id || message.userId == this._user.id){
        this._session.refreshUser(this._user)
        if(message.userId == this._user.id){
          this._route.navigate(['/message', message.friendId]);
        }
      }
    })

    this._session.$user.subscribe(data => {
      this._user = data
      this._friends = this._user.friends
      // console.log(this._friends)
    })  

  }

  getMessage(id : any){
    this.HiddenContactBar.emit('hidden');
    this.isRead(id)
   
  }

  close(){
    this.HiddenContactBar.emit('hidden');
  }

  private isRead(id:any){
    this._isRead.FriendId = parseInt(id),
    this._isRead.UserId = parseInt(this._user.id),
    this._chatService.myHub.send("MessageIsRead", this._isRead)
    
    // this._messageHttpService.isRead(id,this._user.id).subscribe({
    //   next : (data :any) =>{
    //     this._session.refreshUser(this._user.id)
        
    //   },
    //   error : (error) => {
    //     console.log(error)
    //   }}) ;
  }

}
