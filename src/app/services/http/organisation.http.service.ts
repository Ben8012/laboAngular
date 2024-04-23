import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"Organisation/"

@Injectable({
  providedIn: 'root'
})
export class OrganisationHttpService {

  constructor(
    private http:HttpClient,
  ) { }

  getAll() : Observable<any>{
    return this.http.get(apiUrl)
  }

}