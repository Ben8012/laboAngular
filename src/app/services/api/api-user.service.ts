import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
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
    private router : Router
  ) { }

  register(register : IRegister): Observable<any>{
    console.log(register)
    return this.http.post<any>(apiUrl,register)
  }

  login(login : ILoginUser):Observable<IUser>{
    return this.http.post<IUser>(apiUrl+'/Login',login)
  }

  // getUserByEmail(email?: string): Observable<Utilisateur> {
  //   return this.http.post<Utilisateur>(apiLink,email);
  // }

  // changerMotDePasse(id : number,changerMotDePasse: ChangerMotDePasseUtilisateur) {
  //   return this.http.patch(apiLink+'changepasswd/'+id,changerMotDePasse);
  // }

  // getAllClient():Observable<UserWithAdresse[]>{
  //   return this.http.get<UserWithAdresse[]>(apiLink+'clients');
  // }

  // getAllFournisseurs():Observable<UserWithAdresse[]>{
  //   return this.http.get<UserWithAdresse[]>(apiLink+'fournisseurs');
  // }

  // getAllPreparateurs():Observable<UserWithAdresse[]>{
  //   return this.http.get<UserWithAdresse[]>(apiLink+'preparateurs');
  // }

  // deleteClient(id : number){
  //   return this.http.delete(apiLink+'delete/'+id)
  // }

  // getUserById(id : any):Observable<Utilisateur>{
  //   return this.http.get<Utilisateur>(apiLink+'getbyid/'+id)
  // }

  // changeRole(id : number, changeRole : any){
  //   return this.http.patch(apiLink+'changerole/'+id,changeRole)
  // }

  // getFournisseurByArticle(articleId : number):Observable<any[]>{
  //   return this.http.get<any[]>(apiLink+'fournisseurbyarticleid/'+articleId)
  // }
}