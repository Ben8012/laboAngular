import { Component, type OnInit } from '@angular/core';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatorModalComponent } from '../../../modals/CreatorModal/CreatorModal.component';
import { DiveplaceModalComponent } from '../../../modals/diveplaceModal/diveplaceModal.component';
import { ClubModalComponent } from '../../../modals/clubModal/clubModal.component';
import { TrainingModalComponent } from '../../../modals/trainingModal/trainingModal.component';
import { OrganisationModalComponent } from '../../../modals/organisationModal/organisationModal.component';
import { DateHelperService } from 'src/app/services/helper/date.helper.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

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
    private _dateHelperService : DateHelperService
    ) { }

  ngOnInit(): void {
    this._today = new Date()
    this.getUser() 
    this.getAllEvents()
   }

   getAllEvents(){
    this._eventHttpService.getAllEvent().subscribe({
      next : (data :any) =>{
        this._events = data
        this.checkIfParticipe()
        this._events = this._events.filter(e => e.training == null)
        this._events.forEach((event : any) => {
          event.startDate = this._dateHelperService.formatDateToFrench(new Date(event.startDate))
          event.endDate = this._dateHelperService.formatDateToFrench(new Date(event.endDate))
          event.participes.forEach((participe : any) => {
            participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
            participe.medicalDateValidation = new Date(participe.medicalDateValidation)
            participe.birthdate = new Date(participe.birthdate)
          });
          
        });
        console.log(this._events)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
    })
  }


  participe(id : any){
      this._eventHttpService.participe(this._user.id,id).subscribe({
        next : (data :any) =>{
          this.getAllEvents()
        },
        error : (error) => {
          console.log(error)
        }}) ;
   }

   unparticipe(id : any){
    this._eventHttpService.unParticipe(this._user.id,id).subscribe({
      next : (data :any) =>{
        this.getAllEvents()
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

   CalculerAge(dateNaissance : any) {
    var dateActuelle = new Date();
    var anneeActuelle = dateActuelle.getFullYear();
    var moisActuel = dateActuelle.getMonth() + 1;
    var jourActuel = dateActuelle.getDate();

    var anneeNaissance = dateNaissance.getFullYear();
    var moisNaissance = dateNaissance.getMonth() + 1;
    var jourNaissance = dateNaissance.getDate();

    var age = anneeActuelle - anneeNaissance;

    // Vérifier si l'anniversaire est déjà passé cette année
    if (moisActuel < moisNaissance || (moisActuel === moisNaissance && jourActuel < jourNaissance)) {
        age--;
    }

    return age;
    }

}
