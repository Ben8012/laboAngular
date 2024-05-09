
import { Component, type OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FMessage } from 'src/app/models/forms/message.form';
import { DateHelperService } from 'src/app/services/helper/date.helper.service';
import { ChatService } from 'src/app/services/http/chat.http.service';
import { MessageHttpService } from 'src/app/services/http/message.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
 
})
export class MessageComponent implements OnInit {

  private id: any;
  get FriendId(): any { return this.id; }

  private formMessage: FormGroup = FMessage();
  get FormMessage(): FormGroup { return this.formMessage; }

  private _user! : any
  get User(): any { return this._user; }

  // private _messages : any [] = []
  // get Messages(): any []  { return this._messages; }

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Chargements des messages ...";

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _chatService : ChatService,
    private _dateHelperService : DateHelperService,
    private _observableService : ObservableService,
    private _messagesHttpService : MessageHttpService
    ) { }

  
  ngOnInit() {
    this._chatService.myHub.on("ReceiveMessage", (message : any) => {
      if(message.sender.id == this._user.id || message.reciever.id == this._user.id){
        this._session.refreshUser(this._user)
        //message.createdAt = this._dateHelperService.formatDateToFrench(new Date(message.createdAt))
        // this.addMessagesToUser(message)
        // this.countMessages()
        //this._chargingPageMessage=""
      }
    })

    this._chatService.myHub.on("MessageDeleted", (message : any) => {
      if(message.recieverId == this._user.id || message.senderId == this._user.id){
        this._session.refreshUser(this._user)
        // this.deleteMessageToUser(message)
        // this.countMessages()
        // this._chargingPageMessage=""
      }
    })

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getUser()
     
    });
  }


  private getUser(){
    this._session.$user.subscribe({
      next : (data :any) =>{
        this._user = data
        // if(this._user.id){
        //   this.getMessages()
        // }
        this._chargingPageMessage=""
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }



  private getMessages(){
    // this._messagesHttpService.getMessagesBetween(this.User.id,this.id).subscribe({
    //   next : (data :any) =>{
    //     this._chargingPageMessage=""
    //     this._messages = data
    //     this._observableService.$messages.next(this._messages)
    //   },
    //   error : (error) => {
    //     console.log(error)
    //   }}) ;
    // this._user.friends.forEach((friend : any)=>{
    //   if(friend.id == this.id){
    //     friend.messages.forEach((message : any)=> {
    //       message.createdAt = this._dateHelperService.formatDateToFrench(new Date(message.createdAt))
    //     })
    //     this._chargingPageMessage=""
    //   }
    // })
  }

  addMessage(){
    if(this.formMessage.valid){
      this._chargingPageMessage="Envois en cours ..."
      let myMessage : any = {
        SenderId : parseInt(this._user.id),
        RecieverId : parseInt(this.id),
        Content : this.formMessage.value.content.toString(),
      }
      this._chatService.myHub.send("SendMessage", myMessage)
    }
  }

  deleteMessage(id : any){
    this._chargingPageMessage="Suppression en cours ..."
    let messageToDelete : any = {
      Id : parseInt(id),
      SenderId : parseInt(this._user.id),
      RecieverId : parseInt(this.id),
    }
    this._chatService.myHub.send("DeleteMessage",messageToDelete)
  }


  private countMessages(){
    this._user.countMessages = 0
    this._user.friends.forEach((friend : any)=>{
      //count all messages
      friend.messages.forEach((message:any)=> {
        if(message.reciever.id == this._user.id && message.isRead == false){
          this._user.countMessages++
        }
      })
      // messages by friends
      if(friend.id == this.id){
        friend.countMessages = 0
        friend.messages.forEach((message:any)=> {
          if(message.reciever.id == this._user.id  && message.isRead == false){
            friend.countMessages++
          }
        })
      }
    })
    this._session.$user.next(this._user)
  }


  private addMessagesToUser(message:any){
    this._user.friends.forEach((friend : any)=>{
      if(friend.id == this.id)
        //console.log('add')
      friend.messages.push(message)
    })
    this._session.$user.next(this._user)
  } 

  private deleteMessageToUser(message : any){
    this._user.friends.forEach((friend : any)=>{
      if(friend.id == this.id)
        //console.log('deteled')
        friend.messages = friend.messages.filter((m : any )=>  m.id != message.id)
    })
    this._session.$user.next(this._user)
  }
}
