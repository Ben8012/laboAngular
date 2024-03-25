import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { CreatorModalComponent } from '../../modals/CreatorModal/CreatorModal.component';
import { DiveplaceModalComponent } from '../../modals/diveplaceModal/diveplaceModal.component';
import { ClubModalComponent } from '../../modals/clubModal/clubModal.component';
import { TrainingModalComponent } from '../../modals/trainingModal/trainingModal.component';
import { OrganisationModalComponent } from '../../modals/organisationModal/organisationModal.component';

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

  constructor(
    private _eventHttpService: EventHttpService,
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUser() 
   }

   getEventsByUserId(id : any){
    this._eventHttpService.getEventByUserId(id).subscribe({
      next : (data :any) =>{
        this._events = data
        this.checkIfParticipe()
        //this._events = this._events.filter(e => e.training == null)
        console.log(this._events)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      console.log(this._user)
      if(this._user.id){
        console.log(this._user.id)
        this.getEventsByUserId(this._user.id)
      }
    })
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
}
