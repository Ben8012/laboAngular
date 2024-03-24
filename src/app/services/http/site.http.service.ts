import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"Diveplace/"

@Injectable({
  providedIn: 'root'
})
export class SiteHttpService {

  constructor(
    private http:HttpClient,
  ) { }

  getAllSite(id :any) : Observable<any>{
    return this.http.get(apiUrl+"All/"+id)
  }

  vote(siteId: any, userId :any, evalutation : any): Observable<any>{
    const vote = {
        userId : userId,
        diveplaceId : siteId,
        evalutation : evalutation
    }
    return this.http.post(apiUrl+'Vote',vote)
  }

}