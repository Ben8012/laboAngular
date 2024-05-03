import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginUser } from 'src/app/models/interfaces/login-user';
import { IUser } from 'src/app/models/interfaces/user.model';
import { IRegister } from 'src/app/models/interfaces/register-user';
import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+"Image/"

@Injectable({
  providedIn: 'root'
})
export class ImageHttpService {

  constructor(
    private http:HttpClient,
  ) { }
// les differents type
  // ProfilImage
  // InsuranceImage
  // InsuranceImage
  // LevelImage
  // CertificatImage
  // SiteImage
  // SitePlan
  // OrganisationImage
  // TrainingImage

  insert(formData : any, id : any,type :string): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+id+'/'+type,formData, { headers: headers })
  }

  getImage(id: number,type :string): Observable<Blob> {
    return this.http.get(apiUrl+id+'/'+type, { responseType: 'blob' });
  }

  getAllowedImage(id: number,type :string): Observable<Blob> {
    return this.http.get(apiUrl+"Allowed/"+id+'/'+type, { responseType: 'blob' });
  }

}