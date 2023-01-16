
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/interfaces/user.model';

const apiUrl = "https://localhost:7022/api/contact/"

@Injectable({
  providedIn: 'root'
})
export class ApiContactService {



  constructor(
    private _http:HttpClient
  ) { }

  getAllContact():Observable<IUser[]>{
    return this._http.get<IUser[]>(apiUrl);
  }


}
