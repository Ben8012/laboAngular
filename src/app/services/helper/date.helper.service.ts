import { Injectable } from '@angular/core';
import { environment } from 'src/app/environnements/environnement';

const apiUrl = environment.apiUrl+'Chat/'

@Injectable({
  providedIn: 'root'
})

export class DateHelperService {

  

  constructor(
   
  ) { }

  formatDateToFrench(date : any) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const frenchDateTime = date.toLocaleDateString('fr-FR', options);
    return frenchDateTime;
}
}