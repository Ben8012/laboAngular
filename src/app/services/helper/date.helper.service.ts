import { Injectable } from '@angular/core';

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