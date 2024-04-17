import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"Club/"

@Injectable({
  providedIn: 'root'
})
export class ClubHttpService {

  constructor(
    private http:HttpClient,
  ) { }

  getAll() : Observable<any>{
    return this.http.get(apiUrl)
  }

  participe(userId : any, clubId : any): Observable<any>{
    return this.http.get(apiUrl+"Participate/"+userId+"/"+clubId)
  }

  unParticipe(userId : any, clubId : any): Observable<any>{
    return this.http.get(apiUrl+"UnParticipate/"+userId+"/"+clubId)
  }

  getClubByUserId(id :any) : Observable<any>{
    return this.http.get(apiUrl+"GetClubByUserId/"+id)
  }

  getClubById(id : any): Observable<any>{
    return this.http.get(apiUrl+id)
  }

  update(form : any): Observable<any>{
    return this.http.put(apiUrl+form.id,form)
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