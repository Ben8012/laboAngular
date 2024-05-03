
import { Component, type OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FMessage } from 'src/app/models/forms/message.form';
import { DateHelperService } from 'src/app/services/helper/date.helper.service';
import { ChatService } from 'src/app/services/http/chat.http.service';
import { MessageHttpService } from 'src/app/services/http/message.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
 
})
export class MessageComponent implements OnInit {

  private id: any;

  private formMessage: FormGroup = FMessage();
  get FormMessage(): FormGroup { return this.formMessage; }

  private _user! : any
  get User(): any { return this._user; }

  private _messages : any [] = []
  get Messages(): any []  { return this._messages; }

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _chatService : ChatService,
    private _dateHelperService : DateHelperService,
    ) { }

  
  ngOnInit() {
    this._chatService.connection()

    this._chatService.myHub.on("ReceiveMessage", (message : any) => {
      // console.log(message)
      if(message.sender.id == this._user.id || message.reciever.id == this._user.id){
        this._session.refreshUser(this._user)
        this.getMessages()
      }
    })

    this._chatService.myHub.on("MessageDeleted", (message : any) => {
      if(message.senderId == this._user.id || message.recieverId == this._user.id){
        this._session.refreshUser(this._user)
        this.getMessages()
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
          this.getMessages()
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }



  private getMessages(){
    this._user.friends.forEach((friend : any)=>{
      if(friend.id == this.id){
        this._messages= friend.messages
        this._messages.forEach((message : any)=> {
          message.createdAt = this._dateHelperService.formatDateToFrench(new Date(message.createdAt))

        })
      }
    })
    // console.log(this._messages)
  }

  addMessage(){
    if(this.formMessage.valid){
      let myMessage : any = {
        SenderId : parseInt(this._user.id),
        RecieverId : parseInt(this.id),
        Content : this.formMessage.value.content.toString(),
      }
      this._chatService.myHub.send("SendMessage", myMessage)
    }
  }

  deleteMessage(id : any){
    let messageToDelete : any = {
      Id : parseInt(id),
      SenderId : parseInt(this._user.id),
      RecieverId : parseInt(this.id),
    }
    this._chatService.myHub.send("DeleteMessage",messageToDelete)
  }


}
