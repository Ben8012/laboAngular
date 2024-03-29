import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
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
    private _eventHttpService : EventHttpService,
    private _clubtHttpService : ClubHttpService,
  ) { }

  ngOnInit(): void {
    this.modalData = this._modalDataService.getData();
    console.log(this.modalData)
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(id: any){
    
    if(this.modalData.type=="event"){
     
      this._eventHttpService.disable(id).subscribe({
        next : (data :any) =>{
          this.dialogRef.close();
        },
        error : (error) => {
          console.log(error)
        }}) ;
    }

    if(this.modalData.type=="club"){
      
      this._clubtHttpService.disable(id).subscribe({
        next : (data :any) =>{
          this.dialogRef.close();
        },
        error : (error) => {
          console.log(error)
        }}) ;
    }

  }
 }
