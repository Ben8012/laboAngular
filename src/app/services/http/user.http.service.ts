import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginUser } from 'src/app/models/interfaces/login-user';
import { IUser } from 'src/app/models/interfaces/user.model';
import { IRegister } from 'src/app/models/interfaces/register-user';
import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"User/"

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(
    private http:HttpClient,
  ) { }

  register(register : IRegister): Observable<any>{
    return this.http.post<any>(apiUrl,register)
  }

  login(login : ILoginUser):Observable<IUser>{
    return this.http.post<IUser>(apiUrl+'Login',login)
  }

  update(user:any, id : any): Observable<any>{
    return this.http.put<any>(apiUrl+id,user)
  }
  
  getAllUsers(): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  getUserById(id : number) : Observable<any> {
    return this.http.get(apiUrl+id);
  }

  like(likerId : number, likedId : number) : Observable<any>{
    const send = { LikerId : likerId, LikedId : likedId}
    return this.http.post(apiUrl+"Like",send)
  }

  unlike(likerId : number, likedId : number) : Observable<any>{
    const send = { LikerId : likerId, LikedId : likedId}
    return this.http.post(apiUrl+"UnLike",send)
  }

  admin(userId : number) : Observable<any>{
    return this.http.get(apiUrl+"Admin/"+userId)
  }


  unadmin(userId : number) : Observable<any>{
    return this.http.get(apiUrl+"UnAdmin/"+userId)
  }

  deletelike(likerId : number, likedId : number) : Observable<any>{
    const send = { LikerId : likerId, LikedId : likedId}
    return this.http.post(apiUrl+"DeleteLike",send)
  }

  getUserByToken(token : string) : Observable<any>{
    const send = { TokenString : token}
    return this.http.post(apiUrl+'Token',send)
  }

  getFriends(id : number) : Observable<any>{
    return this.http.get(apiUrl+'Friends/'+id)
  }

  getAllOrganisation() : Observable<any>{
    return this.http.get(apiUrl+'Organisation')
  }

  updateInsuranceDate(date : any, userId :any): Observable<any>{
    const send = { Date : date}
    return this.http.put<any>(apiUrl+'UpdateInsuranceDate/'+userId,send)
  }

  updateCertificatDate(date : any, userId :any): Observable<any>{
    const send = { Date : date}
    return this.http.put<any>(apiUrl+'UpdateCertificatDate/'+userId,send)
  }

  sendEmailToResetPassword(email : string):Observable<any>{
    const send = {Email : email}
    return this.http.post(apiUrl+"SendEmailToResetPassword",send)
  }

  resetPassword(password : string,email: string): Observable<any>{
    const send = {Password : password, Email : email}
    return this.http.post(apiUrl+"ResetPassword",send)
  }



}