import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginUser } from 'src/app/models/interfaces/login-user';
import { IUser } from 'src/app/models/interfaces/user.model';
import { IRegister } from 'src/app/models/interfaces/register-user';

const apiUrl = "https://localhost:7022/api/User";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(
    private http:HttpClient,
  ) { }

  register(register : IRegister): Observable<any>{
    console.log(register)
    return this.http.post<any>(apiUrl,register)
  }

  login(login : ILoginUser):Observable<IUser>{
    return this.http.post<IUser>(apiUrl+'/Login',login)
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl);
  }

  getUserById(id : number) : Observable<any> {
    return this.http.get(apiUrl+'/'+id);
  }

  like(likerId : number, likedId : number) : Observable<any>{
    const send = { LikerId : likerId, LikedId : likedId}
    return this.http.post(apiUrl+"/Like",send)
  }

  unlike(likerId : number, likedId : number) : Observable<any>{
    const send = { LikerId : likerId, LikedId : likedId}
    return this.http.post(apiUrl+"/UnLike",send)
  }

  getUserByToken(token : string) : Observable<any>{
    const send = { TokenString : token}
    return this.http.post(apiUrl+'/Token',send)
  }

  getFriends(id : number) : Observable<any>{
    return this.http.get(apiUrl+'/Friends/'+id)
  }

  getAllOrganisation() : Observable<any>{
    return this.http.get(apiUrl+'/Organisation')
  }


}