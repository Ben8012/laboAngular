import { Component, type OnInit } from '@angular/core';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-creator-modal',
  templateUrl: './CreatorModal.component.html',
  styleUrls: ['./CreatorModal.component.scss'],
})
export class CreatorModalComponent implements OnInit {

  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<CreatorModalComponent>,
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
