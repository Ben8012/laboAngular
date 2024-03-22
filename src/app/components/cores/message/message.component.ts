
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
    //this._chatService.connection()

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this._session.$user.subscribe({
      next : (data :any) =>{
        this._user = data
        if(this._user.id){
          this.getMessages()

          //ajouter le chat
          // this._chatService.getMessage(this._user.id,this.id).subscribe({
          //   next : (data : any[]) => this._messages = data
          // })
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;

    

    // this._chatService.myHub.on("receiveMessage", (message : any) => {
    //   this._messages.push(message)
    // })
  }



  private getMessages(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._messageHttpService.getMessagesBetween(this._user.id,this.id ).subscribe((data :any) =>{
        this._messages = data
        console.log(this.Messages)
      }, error => {
        console.log(error)
      }) ;

    });
  }

  addMessage(){
    this.FormMessage.value.senderId = this._user.id.toString()
    this.FormMessage.value.recieverId = this.id
    
    if(this.formMessage.valid){
      this._messageHttpService.insert(this.formMessage.value).subscribe({
        next : (data :any) =>{
          this.getMessages()
        },
        error : (error) => {
          console.log(error)
        }}) ;

      // ajouter le chat
      //this._chatService.myHub.send("SendMessage", this.formMessage.value)
    }
  }

  deleteMessage(id : any){
    console.log('test')
    this._messageHttpService.delete(id).subscribe({
      next : (data :any) =>{
        this.getMessages()
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

}
