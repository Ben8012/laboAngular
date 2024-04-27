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

 

  insertProfilImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'ProfilImage/'+id,formData, { headers: headers })
  }

  getProfilImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'ProfilImage/'+imageName, { responseType: 'blob' });
  }

  insertInsuranceImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'InsuranceImage/'+id,formData, { headers: headers })
  }

  getInsuranceImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'InsuranceImage/'+imageName, { responseType: 'blob' });
  }

  insertLevelImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'LevelImage/'+id,formData, { headers: headers })
  }

  getLevelImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'LevelImage/'+imageName, { responseType: 'blob' });
  }

  insertCertificatImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'CertificatImage/'+id,formData, { headers: headers })
  }

  getCertificatImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'CertificatImage/'+imageName, { responseType: 'blob' });
  }

  insertSiteImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'SiteImage/'+id,formData, { headers: headers })
  }

  getSiteImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'SiteImage/'+imageName, { responseType: 'blob' });
  }

  insertSitePlan(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'SitePlan/'+id,formData, { headers: headers })
  }

  getSiteMap(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'SitePlan/'+imageName, { responseType: 'blob' });
  }

  insertOrganisationImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'OrganisationImage/'+id,formData, { headers: headers })
  }

  getOrganisationImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'OrganisationImage/'+imageName, { responseType: 'blob' });
  }

  insertTrainingImage(formData : any, id : any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(apiUrl+'TrainingImage/'+id,formData, { headers: headers })
  }

  getTrainingImage(imageName: string): Observable<Blob> {
    return this.http.get(apiUrl+'TrainingImage/'+imageName, { responseType: 'blob' });
  }



 

}