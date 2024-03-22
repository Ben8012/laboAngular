import {  Component, OnInit } from '@angular/core';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-club-modal',
  templateUrl: './clubModal.component.html',
  styleUrls: ['./clubModal.component.scss'],
})
export class ClubModalComponent implements OnInit {

  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<ClubModalComponent>,
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
