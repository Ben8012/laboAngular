import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"Event/"

@Injectable({
  providedIn: 'root'
})
export class EventHttpService {

  constructor(
    private http:HttpClient,
  ) { }

  getAllEvent() : Observable<any>{
    return this.http.get(apiUrl)
  }

  participe(userId : any, eventId : any): Observable<any>{
    return this.http.get(apiUrl+"Participate/"+userId+"/"+eventId)
  }

  unParticipe(userId : any, eventId : any): Observable<any>{
    return this.http.get(apiUrl+"UnParticipate/"+userId+"/"+eventId)
  }

  getEventByUserId(id :any) : Observable<any>{
    return this.http.get(apiUrl+"GetEventByUserId/"+id)
  }

  getEventById(id :any) : Observable<any>{
    return this.http.get(apiUrl+id)
  }

  update(form : any): Observable<any>{
    return this.http.put(apiUrl,form)
  }

  insert(form : any): Observable<any>{
    return this.http.post(apiUrl,form)
  }

  disable(id : any) : Observable<any>{
    return this.http.patch(apiUrl+"Disable/"+id,{})
  }

  validationParticipate(userId : any, clubId : any): Observable<any>{
    return this.http.get(apiUrl+"ValidationParticipate/"+userId+"/"+clubId)
  }

  unValidationParticipate(userId : any, clubId : any): Observable<any>{
    return this.http.get(apiUrl+"UnValidationParticipate/"+userId+"/"+clubId)
  }



}