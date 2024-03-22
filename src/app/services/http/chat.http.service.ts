import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+'Chat/'

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  myHub! : signalr.HubConnection

  constructor(
    private http : HttpClient
  ) { }

  connection() {
    this.myHub = new signalr.HubConnectionBuilder()
              .withUrl(apiUrl+"/chat").build()
    this.myHub.start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.error('Error while establishing connection :('+ err));
  }

  getMessage(sender : any, reciever : any): Observable<any[]> {
    return this.http.get<any[]>(apiUrl+sender+'/'+reciever)
  }
}

