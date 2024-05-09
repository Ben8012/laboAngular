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
import { DeleteEventModelComponent } from 'src/app/components/modals/delete-eventModel/delete-eventModel.component';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { NavigationHistoryService } from 'src/app/services/navigation/navigation.history.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  private _url :any


  private _urlSegements : any
  get UrlSegements(): any { return this._urlSegements[0].path; }

  private _activateButtons :any
  get ActivateButtons(): any []  { return this._activateButtons; }

  private _events : any [] = []
  get Events(): any []  { return this._events; }

  get User(): any { return this._user; }
  private _user!: any;

  get Today(): any { return this._today; }
  private _today: any;

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Page en chargement ...";

  constructor(
    private _eventHttpService: EventHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    private _router : Router,
    private route: ActivatedRoute,
    private _observableService : ObservableService,
    private navigationHistoryService: NavigationHistoryService
    ) { }

  ngOnInit(): void {
    this._observableService.getAllEvents()
    // const currentUrl = this.navigationHistoryService.getCurrentUrl();
    // console.log('URL actuelle:', currentUrl);

    this._today = new Date()
   
    this.route.url.subscribe(segments => {
      
      this._urlSegements = segments
      this._url = segments.join('/');
      this.navigationHistoryService.pushUrl(this._url)
      //console.log("L'URL a changé :", this._url);

      this.getUser()
      if (segments.length > 0 && segments[0].path === "event" || segments[0].path === "formation") {
        //console.log("URL contient 'event ou formation'");
        this.getAllEvents();
        this._activateButtons = false
      }
    });
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      // console.log(this._user)
      if(this._user.id && this._urlSegements.length > 0 && (this._urlSegements[0].path === "my-events" || this._urlSegements[0].path === "my-book" )){
        //console.log("my-events")
        this.getEventsByUserId()
        this._activateButtons = true
      }
      
    })
  }



   getEventsByUserId(){
    this._observableService.$events.subscribe((events: any) => {
      // console.log(events)
     if(events && events.length > 0){
        events = events.filter((event : any) => event.creator.id == this._user.id)
        if(this._urlSegements[0].path === "my-events"){
          events = events.filter((event : any) => new Date(event.startDate).getTime() >= this._today.getTime())
        }
        if(this._urlSegements[0].path === "my-book"){
          events = events.filter((event : any) => new Date(event.startDate).getTime() < this._today.getTime())
        }
        if(this._user.id){
          this.checkIfParticipe(events)
        }
        
        this._chargingPageMessage =""
        
        this._events = events;
        //console.log('mu events',events)
      }
    })

    // this._eventHttpService.getEventByUserId(id).subscribe({
    //   next : (data :any) =>{
    //     this._events = data
    //     if(this._urlSegements[0].path === "my-events"){
    //       this._events = this._events.filter((event : any) => new Date(event.startDate).getTime() >= this._today.getTime())
    //     }
    //     if(this._urlSegements[0].path === "my-book"){
    //       this._events = this._events.filter((event : any) => new Date(event.startDate).getTime() < this._today.getTime())
    //     }
    //     this.checkIfParticipe()
    //     this.formatEventForView()
    //     this.addLevelToView(this._events) 
    //     //console.log(this._events)
    //     if(this._events.length == 0){
    //       this._chargingPageMessage ="Vous n'avez pas d'évenement(s) actuellement ou ceux ci sont dans votre carnet"
    //     }else{
    //       this._chargingPageMessage =""
    //     }
    //   },
    //   error : (error) => {
    //     console.log(error)
    //   }}) ;
   }

   getAllEvents(){
    this._observableService.$events.subscribe((events: any) => {
      // console.log(events)
     if(events && events.length > 0){
        events = events.filter((event : any) => new Date(event.startDate).getTime() > this._today.getTime())
        //events = events.filter((event : any) => event.creator.id != this._user.id)
        this._activateButtons = false
        if(this._urlSegements[0].path === "event" ){
          events = events.filter((event : any) => event.training == null)
        }
        if(this._urlSegements[0].path === "formation" ){
          events = events.filter((event : any) => event.training != null)
        }
        if(this._user.id){
          this.checkIfParticipe(events)
        }
        this._events = events
        if(events.length == 0){
          this._chargingPageMessage ="il n'y a pas d'évenements programmés ou ceux ci sont dans votre carnet"
        }else{
          this._chargingPageMessage =""
        }
        this._events = events;
        // console.log(events)
      }
      
    })


    // this._eventHttpService.getAllEvent().subscribe({
    //   next : (data :any) =>{
    //     this._events = data
    //     this._events = this._events.filter((event : any) => new Date(event.startDate).getTime() > this._today.getTime())
    //     this._events = this._events.filter((event : any) => event.creator.id != this._user.id)
    //     this.checkIfParticipe()
    //     this._activateButtons = false
    //     if(this._urlSegements[0].path === "event" ){
    //       this._events = this._events.filter(e => e.training == null)
    //     }
    //     if(this._urlSegements[0].path === "formation" ){
    //       this._events = this._events.filter(e => e.training != null)
    //     }
    //     this.formatEventForView()
    //     this.addLevelToView(this._events) 
    //     if(this._events.length == 0){
    //       this._chargingPageMessage ="Il n'y encore d'évenement(s) futur créer"
    //     }else{
    //       this._chargingPageMessage =""
    //     }
    //   },
    //   error : (error) => {
    //     console.log(error)
    //   }}) ;
   }

 


  participe(event : any){
      // console.log(event)
      let participe = false
      event.demands.map((demand : any) => {
        if(demand.id == this._user.id){
          alert("vous avez deja fait une demande")
          participe = true
        }
        else{
          participe = false
        }
      })
      if(!participe){
        event.hiddenButtons = true
        this._eventHttpService.participe(this._user.id,event.id).subscribe({
          next : (data :any) =>{
            this._observableService.getAllEvents()
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }
   }

   unparticipe(event : any){
    event.hiddenButtons = true
    this._eventHttpService.unParticipe(this._user.id,event.id).subscribe({
      next : (data :any) =>{
        this._observableService.getAllEvents()
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

 
   private checkIfParticipe(events :any){
    events.forEach((event :any) => {
        event.isParticipe = false
        event.participes.forEach((p : any) => {
          if(p.id == this._user.id)
          event.isParticipe = true;
        })
        event.demands.forEach((p : any) => {
          if(p.id == this._user.id)
            event.isParticipe = true;
        })
    });
   }

   creatorInfo(creator : any) :void{
    this._modalDataService.setData(creator);
    this.dialog.closeAll();
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(CreatorModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   diveplaceInfo(diveplace : any){
    this._modalDataService.setData(diveplace);
    this.dialog.closeAll();
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DiveplaceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   clubInfo(club: any){
    this._modalDataService.setData(club);
    this.dialog.closeAll();
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(ClubModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   trainingInfo(training : any){
    this._modalDataService.setData(training);
    this.dialog.closeAll();
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(TrainingModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   organisationInfo(organisation : any){
    this._modalDataService.setData(organisation);
    this.dialog.closeAll();
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(OrganisationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
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

    deleteEvent(event : any){
      this._modalDataService.setData(event);
      document.body.classList.add('modal-open');
      const dialogRef = this.dialog.open(DeleteEventModelComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        // console.log('Le modal est fermé');
        document.body.classList.remove('modal-open'); 
        if(this._urlSegements[0].path === "my-events"){
            this._activateButtons = true
        }
        if(this._urlSegements[0].path === "event" || this._urlSegements[0].path === "formation"){
          this._activateButtons = false
      }
        
      });
     }
  
     updateEvent(event : any){
      this._router.navigate(['update-event',event.id])
    }
}
