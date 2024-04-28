import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environnements/environnement';
import * as signalr from '@microsoft/signalr';

const apiUrl = environment.apiUrl+"Message/"


@Injectable({
  providedIn: 'root'
})
export class MessageHttpService {

  constructor(
    private http:HttpClient,
  ) { }



  getMessagesBySenderId(id: any): Observable<any> {
    return this.http.get(apiUrl+'SenderMessages/'+id)
  }

  getMessagesByRecieverId(id: any): Observable<any> {
    return this.http.get(apiUrl+'RecieverMessages/'+id)
  }

  getMessagesBetween(sender : any, reciever : any): Observable<any> {
    return this.http.get(apiUrl+'MessagesBetween/'+sender+'/'+reciever)
  }

  insert(form : any) : Observable<any> {
    return this.http.post(apiUrl,form)
  }

  delete(id : any) : Observable<any> {
    return this.http.delete(apiUrl+id)
  }

  isRead(friendId:any, userId: any): Observable<any> {
    return this.http.get(apiUrl+'IsRead/'+friendId+'/'+userId)
  }

  


}