
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';

@Component({
  selector: 'app-training-modal',
  templateUrl: './trainingModal.component.html',
  styleUrls: ['./trainingModal.component.scss'],
})
export class TrainingModalComponent implements OnInit {

  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<TrainingModalComponent>,
    private _modalDataService: ModalDataService
  ) { }

  ngOnInit(): void {
    this.modalData = this._modalDataService.getData();
    // console.log(this.modalData)
  }

  onClose(): void {
    this.dialogRef.close();
  }
}