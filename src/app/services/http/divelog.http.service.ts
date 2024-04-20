import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"Divelog/"

@Injectable({
  providedIn: 'root'
})
export class DivelogHttpService {

  constructor(
    private http:HttpClient,
  ) { }

  getAll() : Observable<any>{
    return this.http.get(apiUrl)
  }

  getById(id : any): Observable<any>{
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

  enable(id : any) : Observable<any>{
    return this.http.patch(apiUrl+"Enable/"+id,{})
  }

  delete(id : any) : Observable<any>{
    return this.http.delete(apiUrl+id)
  }





  
  




}