
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { MessageHttpService } from 'src/app/services/http/message.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
 
})
export class MessageComponent implements OnInit {

  private id: any;

  private _user! : any
  get User(): any { return this._user; }

  private _messages : any [] = []
  get Messages(): any []  { return this._messages; }

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _messageHttpService : MessageHttpService
    ) { }

  
  ngOnInit() {
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
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._messageHttpService.getMessagesBetween(this._user.id,this.id ).subscribe((data :any) =>{
        this._messages = data
        console.log(this.Messages[0].content)
      }, error => {
        console.log(error)
      }) ;

    });
  }

}
