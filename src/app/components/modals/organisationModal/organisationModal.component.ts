
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';

@Component({
  selector: 'app-organisation-modal',
  templateUrl: './organisationModal.component.html',
  styleUrls: ['./organisationModal.component.scss'],
})
export class OrganisationModalComponent implements OnInit {

  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<OrganisationModalComponent>,
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