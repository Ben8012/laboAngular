import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';

@Component({
  selector: 'app-delete-event-model',
  templateUrl: './delete-eventModel.component.html',
  styleUrls: ['./delete-eventModel.component.scss'],
})
export class DeleteEventModelComponent implements OnInit {

  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteEventModelComponent>,
    private _modalDataService: ModalDataService,
    private _eventHttpService : EventHttpService
  ) { }

  ngOnInit(): void {
    this.modalData = this._modalDataService.getData();
    console.log(this.modalData)
  }

  onClose(): void {
    this.dialogRef.close();
  }

  deleteEvent(id: any){
    this._eventHttpService.disable(id).subscribe({
      next : (data :any) =>{
        this.dialogRef.close();
      },
      error : (error) => {
        console.log(error)
      }}) ;

  }
 }
