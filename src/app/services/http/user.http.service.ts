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
    console.log(register)
    return this.http.post<any>(apiUrl,register)
  }

  login(login : ILoginUser):Observable<IUser>{
    console.log('test')
    return this.http.post<IUser>(apiUrl+'Login',login)
  }

  update(user:any, id : any): Observable<any>{
    return this.http.put<any>(apiUrl+id,user)
  }

  updateImageProfile(formData : any,id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put<any>(apiUrl+"ImageProfil/"+id,formData, { headers: headers })
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl);
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


}