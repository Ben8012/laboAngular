import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { CreatorModalComponent } from '../../../modals/CreatorModal/CreatorModal.component';
import { DiveplaceModalComponent } from '../../../modals/diveplaceModal/diveplaceModal.component';
import { ClubModalComponent } from '../../../modals/clubModal/clubModal.component';
import { OrganisationModalComponent } from '../../../modals/organisationModal/organisationModal.component';
import { DeleteEventModelComponent } from '../../../modals/delete-eventModel/delete-eventModel.component';
import { TrainingModalComponent } from 'src/app/components/modals/trainingModal/trainingModal.component';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss'],
})

export class MyEventsComponent implements OnInit { 

  private _events : any [] = []
  get Events(): any []  { return this._events; }

  get User(): any { return this._user; }
  private _user!: any;

  get Today(): any { return this._today; }
  private _today: any;

  constructor(
    private _eventHttpService: EventHttpService,
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    private _router : Router,
    ) { }

  ngOnInit(): void {
    this._today = new Date()
    this.getUser() 
   }

   getEventsByUserId(id : any){
    this._eventHttpService.getEventByUserId(id).subscribe({
      next : (data :any) =>{
        this._events = data
        console.log(this._events)
        this.checkIfParticipe()
        this._events.forEach((event : any) => {
          event.participes.forEach((participe : any) => {
            participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
            participe.medicalDateValidation = new Date(participe.medicalDateValidation)
          });
          event.startDate = new Date(event.startDate)
          event.endDate = new Date(event.endDate)
          
        });
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      //console.log(this._user)
      if(this._user.id){
        //console.log(this._user.id)
        this.getEventsByUserId(this._user.id)
      }
    })
  }

  updateEvent(event : any){
    this._router.navigate(['update-event',event.id])
  }

 
  participe(id : any){
      this._eventHttpService.participe(this._user.id,id).subscribe({
        next : (data :any) =>{
          this.getEventsByUserId(this._user.id)
        },
        error : (error) => {
          console.log(error)
        }}) ;
   }

   unparticipe(id : any){
    this._eventHttpService.unParticipe(this._user.id,id).subscribe({
      next : (data :any) =>{
        this.getEventsByUserId(this._user.id)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   checkIfParticipe(){
    this._events.forEach(event => {
        event.isParticipe = false
        event.participes.forEach((p : any) => {
          if(p.id == this._user.id)
          event.isParticipe = true;
        })
    });
   }

   creatorInfo(creator : any) :void{
    this._modalDataService.setData(creator);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(CreatorModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   diveplaceInfo(diveplace : any){
    this._modalDataService.setData(diveplace);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DiveplaceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   clubInfo(club: any){
    this._modalDataService.setData(club);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(ClubModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   trainingInfo(training : any){
    this._modalDataService.setData(training);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(TrainingModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   organisationInfo(organisation : any){
    this._modalDataService.setData(organisation);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(OrganisationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   deleteEvent(event : any){
    this._modalDataService.setData(event);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DeleteEventModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }
 
}
