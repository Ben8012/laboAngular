import {  Component, OnInit } from '@angular/core';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'diveplace-modal',
  templateUrl: './diveplaceModal.component.html',
  styleUrls: ['./diveplaceModal.component.scss'],
})
export class DiveplaceModalComponent implements OnInit {
  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<DiveplaceModalComponent>,
    private _modalDataService: ModalDataService
  ) { }

  ngOnInit(): void {
    this.modalData = this._modalDataService.getData();
    console.log(this.modalData)
  }

  onClose(): void {
    this.dialogRef.close();
  }
 }