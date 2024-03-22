import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {
  modalData: any;

  constructor() { }

  setData(data: any) {
    this.modalData = data;
  }

  getData() {
    return this.modalData;
  }
}