
import { Component, type OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FMessage } from 'src/app/models/forms/message.form';
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
    private _messageHttpService : MessageHttpService,
    private _chatService : ChatService,
    ) { }

  
  ngOnInit() {
    this._chatService.connection()

    this._chatService.myHub.on("ReceiveMessage", (message : any) => {
      if(message.sender.id == this._user.id || message.reciever.id == this._user.id){
        this._session.refreshUser(this._user.id)
        this._messages.push(message)
      }
    })

    this._chatService.myHub.on("MessageDeleted", (message : any) => {
      if(message.senderId == this._user.id || message.recieverId == this._user.id){
        this._session.refreshUser(this._user.id)
        this._messages = this._messages.filter((m : any)=> { m.id != message.id})
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
          this.isRead()
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

  private isRead(){
    console.log('ici')
    this._messageHttpService.isRead(this.id,this._user.id).subscribe({
      next : (data :any) =>{
       this.getMessages()
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

  private getMessages(){
    this._chatService.getMessage(this._user.id,this.id).subscribe({
      next : (data :any) =>{
        this._messages = data
        console.log(data)
       },
       error : (error) => {
         console.log(error)
       }}) ;
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
