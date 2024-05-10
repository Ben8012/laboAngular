
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

  private _hiddenSendButton :any
  get HiddenSendButton(): any []  { return this._hiddenSendButton; }

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
      //console.log(message)
      if(message.senderId == this._user.id || message.recieverId == this._user.id){
          this.changeUserMessage(message)
      }
    })

    this._chatService.myHub.on("MessageDeleted", (message : any) => {
      //console.log(message)
      if(message.senderId == this._user.id || message.recieverId == this._user.id){
        this.changeUserMessage(message)   
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
        if(this._user.id){
           this._chargingPageMessage=""
          //  this._user.friends.forEach((friend : any)=> {
          //     console.log(friend)
            
            
          // })
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

  private changeUserMessage(message : any){
   
    if(message.messages.length == 0) {
      //console.log(message)
      let actionRealisee = false
      this._user.friends.forEach((friend : any)=> {
        if(!actionRealisee){
          if(message.senderId == this._user.id || message.recieverId == this._user.id){
            //console.log(message)
            friend.messages = []
            this._session.countFriendMessages(friend,this._user)
            actionRealisee = true;
          }
        }
      })
    }
    else{
      //console.log(message)
      let actionRealisee = false
      message.messages.forEach((m:any)=> {
        if(!actionRealisee){
          //console.log(message)
          m.createdAt = this._dateHelperService.formatDateToFrench(new Date(m.createdAt))
          this._user.friends.forEach((friend : any)=> {
            if(friend.id == m.reciever.id || friend.id == m.sender.id){
              friend.messages = message.messages
              this._session.countFriendMessages(friend,this._user)
              message.hiddenButtons = false
              actionRealisee = true;
            }
          })
        }
      })
    }
    this._hiddenSendButton = false
    this._session.countUserMessage(this._user)
    this._chargingPageMessage=""
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
      this._hiddenSendButton = true
      // this._chargingPageMessage="Envois en cours ..."
      let myMessage : any = {
        SenderId : parseInt(this._user.id),
        RecieverId : parseInt(this.id),
        Content : this.formMessage.value.content.toString(),
      }
      this._chatService.myHub.send("SendMessage", myMessage)
    }
  }

  deleteMessage(message : any){
    message.hiddenButtons = true
    //this._chargingPageMessage="Suppression en cours ..."
    let messageToDelete : any = {
      Id : parseInt(message.id),
      SenderId : parseInt(this._user.id),
      RecieverId : parseInt(this.id),
    }
    this._chatService.myHub.send("DeleteMessage",messageToDelete)
  }


  // private countMessages(){
  //   this._user.countMessages = 0
  //   this._user.friends.forEach((friend : any)=>{
  //     //count all messages
  //     friend.messages.forEach((message:any)=> {
  //       if(message.reciever.id == this._user.id && message.isRead == false){
  //         this._user.countMessages++
  //       }
  //     })
  //     // messages by friends
  //     if(friend.id == this.id){
  //       friend.countMessages = 0
  //       friend.messages.forEach((message:any)=> {
  //         if(message.reciever.id == this._user.id  && message.isRead == false){
  //           friend.countMessages++
  //         }
  //       })
  //     }
  //   })
  //   this._session.$user.next(this._user)
  // }


  // private addMessagesToUser(message:any){
  //   this._user.friends.forEach((friend : any)=>{
  //     if(friend.id == this.id)
  //       //console.log('add')
  //     friend.messages.push(message)
  //   })
  //   this._session.$user.next(this._user)
  // } 

  // private deleteMessageToUser(message : any){
  //   this._user.friends.forEach((friend : any)=>{
  //     if(friend.id == this.id)
  //       //console.log('deteled')
  //       friend.messages = friend.messages.filter((m : any )=>  m.id != message.id)
  //   })
  //   this._session.$user.next(this._user)
  // }
}
