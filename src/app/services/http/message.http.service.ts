import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environnements/environnement';

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

  getMessagesBetween(sender : any, reciever : any): Observable<any> {
    return this.http.get(apiUrl+'MessagesBetween/'+sender+'/'+reciever)
  }

  


}