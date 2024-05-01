
import {  Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';

@Component({
  selector: 'app-condition-modal',
  templateUrl: './conditionModal.component.html',
  styleUrls: ['./conditionModal.component.scss'],
})
export class ConditionModalComponent implements OnInit {

  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<ConditionModalComponent>,
    private _modalDataService: ModalDataService
  ) { }

  ngOnInit(): void {
    this.modalData = this._modalDataService.getData();
  }

  onClose(): void {
    this.dialogRef.close();
  }
 }