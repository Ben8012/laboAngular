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

  getAllClub() : Observable<any>{
    return this.http.get(apiUrl)
  }

  participe(userId : any, clubId : any): Observable<any>{
    return this.http.get(apiUrl+"Participate/"+userId+"/"+clubId)
  }

  unParticipe(userId : any, clubId : any): Observable<any>{
    return this.http.get(apiUrl+"UnParticipate/"+userId+"/"+clubId)
  }




}