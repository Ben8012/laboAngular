import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-delete-event-model',
  templateUrl: './delete-eventModel.component.html',
  styleUrls: ['./delete-eventModel.component.scss'],
})
export class DeleteEventModelComponent implements OnInit {

  modalData: any;

  private _events : any [] = []
  //get Events(): any []  { return this._events; }

  private _clubs : any [] = []
  //get Clubs(): any []  { return this._clubs; }

  constructor(
    public dialogRef: MatDialogRef<DeleteEventModelComponent>,
    private _modalDataService: ModalDataService,
    private _eventHttpService : EventHttpService,
    private _clubtHttpService : ClubHttpService,
    private _observableService : ObservableService,
  ) { }

  ngOnInit(): void {
    this.modalData = this._modalDataService.getData();
    this.getAllEvents()
    this.getAllClubs()
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(id: any){
    
    if(this.modalData.type=="event"){
      this._events.forEach((event : any)=>{
        if(event.id == id){
         event.hiddenButtons = true
        }
      })
      this._eventHttpService.disable(id).subscribe({
        next : (data :any) =>{
          this._events = this._events.filter((event :any)=> event.id != id)
          this._observableService.$events.next(this._events)
          this.dialogRef.close();
        },
        error : (error) => {
          console.log(error)
        }}) ;
    }

    if(this.modalData.type=="club"){
      this._clubs.forEach((club : any)=>{
        if(club.id == id){
          club.hiddenButtons = true
        }
      })
      this._clubtHttpService.disable(id).subscribe({
        next : (data :any) =>{
          console.log('deleted')
          this._clubs = this._clubs.filter((club :any)=> club.id != id)
          console.log(this._clubs)
          this._observableService.$clubs.next(this._clubs)
          this.dialogRef.close();
        },
        error : (error) => {
          console.log(error)
        }}) ;
    }

  }

  getAllEvents(){
    this._observableService.$events.subscribe((events: any) => {
     // console.log(events)
     if(events && events.length > 0){
       this._events = events
      }
      
    })
  }

  getAllClubs(){
    this._observableService.$clubs.subscribe((clubs: any) => {
     // console.log(clubs)
     if(clubs && clubs.length > 0){
       this._clubs = clubs
      }
      
    })
  }
 }
