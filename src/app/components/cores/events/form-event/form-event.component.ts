import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FEvent } from 'src/app/models/forms/event.form';
import { DateHelperService } from 'src/app/services/helper/date.helper.service';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { SiteHttpService } from 'src/app/services/http/site.http.service';
import { TrainingHttpService } from 'src/app/services/http/training.http.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss'],
})
export class FormEventComponent implements OnInit {
  private _id :any
  get Id(): any { return this._id; }

  private formEvent: FormGroup = FEvent();
  get FormEvent(): FormGroup { return this.formEvent; }
  get Name():any {return this.formEvent.get('name');}
  get StartDate():any {return this.formEvent.get('startdate');}
  get EndDate():any {return this.formEvent.get('enddate');}
  get DiveplaceId():any {return this.formEvent.get('diveplaceId');}
  get TrainingId():any {return this.formEvent.get('trainingId');}
  get CulbId():any {return this.formEvent.get('culbId');}
  get Errors():any{return this.formEvent.errors}

  private _user! : any
  get User(): any { return this._user; }

  private _events : any[] = []
  private _event : any 
  get Event(): any  { return this._event; }

  private _sites : any 
  get Sites(): any []  { return this._sites; }

  private _trainings : any 
  private _userTrainings : any[] = []
  get Trainings(): any []  { return this._userTrainings; }

  private _clubs : any 
  private _userClubs : any[] = []
  get Clubs(): any []  { return this._userClubs; }

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Page en chargement ...";

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _eventHttpService : EventHttpService,
    private _siteHttpService : SiteHttpService,
    private _observableService : ObservableService,
    private _router : Router,
    private _dateHelperService : DateHelperService,
    private _imageHttpService : ImageHttpService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this._id = (params['id']);
    });
    this.getUser()
    this.getAllEvents()
 }
 private getUser(){
   this._session.$user.subscribe({
    next : (data :any) =>{
      this._user = data
      if(this._user.id){
        this.getAllDiveplace(this._user.id)
        this._user.trainings = this._user.trainings.filter((t : any) => t.name !== 'Instructor')
      }
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getAllEvents(){
    this._observableService.$events.subscribe((events: any) => {
      if(events && events.length > 0){
        this._events = events
        if(this._id){
          events.forEach((event : any)=>{
            if(event.id == this._id){
              this._event=event
              //console.log(event)
            }
          })
          if(this._event.id){
            this.addToForm()
          }
        }
      }
    })
    this._chargingPageMessage=""
  // this._eventHttpService.getEventById(id).subscribe({
  //   next : (data :any) =>{
  //     this._event = data
      // if(this._event.id){
      //   this.addToForm()
      //   this._chargingPageMessage=""
      // }
  //   },
  //   error : (error) => {
  //     console.log(error)
  //   }}) ;
 }

 private getAllDiveplace(id :any){
  this._siteHttpService.getAllSiteAndVote(id).subscribe({
    next : (data :any) =>{
      this._sites = data
      this._sites = this._sites.filter((c : any) => c.isActive == 1 )
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }


 private addToForm(){
  let form = {
    id : this._event.id,
    name : this._event.name,
    startdate : this._event.startDate.toISOString().substring(0,19),
    enddate : this._event.endDate.toISOString().substring(0,19),
    diveplaceId : this._event.diveplace.id,
    trainingId : this._event.training ? this._event.training.id : 0,
    clubId : this._event.club ? this._event.club.id : 0,
    creatorId : this._user.id
  }
  this.formEvent.patchValue(form);
}

 send() {
  this.formEvent.value.creatorId = this._user.id
  if (this.formEvent.valid) {
    if(this._id){
      // console.log('update')
      this._eventHttpService.update(this.formEvent.value).subscribe({
        next: (data: any) => {
           //console.log(data)
           this.formatEventForView(data)  
           this.addLevelToView(data)
           this._events.forEach((event: any, index: number) => {
             if (event.id === data.id) {
                 this._events[index] = data; // Remplacer l'élément réel dans le tableau
             }
           });
           this._observableService.$events.next(this._events)
           this._router.navigate(['my-events'])
        },
        error: (error) => {
          console.log(error);
        }
      });
      }
   
    else{
      this.formEvent.value.creatorId = this._user.id
      this.formEvent.value.trainingId = this.formEvent.value.trainingId ? this.formEvent.value.trainingId : 0,
      this.formEvent.value.clubId = this.formEvent.value.clubId ? this.formEvent.value.clubId : 0,
      delete this.formEvent.value.id
      // console.log('insert')
      // console.log(this.formEvent.value)
      this._eventHttpService.insert(this.formEvent.value).subscribe({
        next: (data: any) => {
          console.log(data)
          console.log(this._events)
          this.formatEventForView(data)  
          this.addLevelToView(data)
          this._events.push(data)
          this._observableService.$events.next(this._events)
          this._router.navigate(['my-events'])

        },
        error: (error) => {
          console.log(error);
        }
      });
      }
    }
  }

  unparticipe(id : any){
    this._eventHttpService.unParticipe(id,this._event.id).subscribe({
      next : (data :any) =>{
        this._observableService;this.getAllEvents()
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

  private formatEventForView(event : any){
    event.startDateFrench = this._dateHelperService.formatDateToFrench(new Date(event.startDate))
      event.endDateFrench = this._dateHelperService.formatDateToFrench(new Date(event.endDate))
      event.participes.forEach((participe : any) => {
        participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
        participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      });
      event.startDate = new Date(event.startDate)
      event.endDate = new Date(event.endDate)
      event.type = "event"
      event.chargingMessage=""
      event.hiddenButtons = false
      
      if(event.diveplace.guidImage != null){
        this._imageHttpService.getAllowedImage(event.diveplace.id,"SiteImage").subscribe(imageData => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            event.diveplace.image = e.target.result;
          }
          reader.readAsDataURL(imageData);
        });
      }
 }

 private addLevelToView(event :any){
    event.creator.trainings.forEach((training : any) =>{
      if(training.isMostLevel == true){
        event.creator.level = training.name
        event.creator.organisation = training.organisation.name
      }
    });
    this.addMostLevel(event.creator.friends)
    this.addMostLevel(event.creator.likeds)
    this.addMostLevel(event.creator.likers)
  }

  private addMostLevel(elements :any){
    elements.map((element : any) => {
      element.trainings.map((training : any)=>{
        if(training.isMostLevel ==  true){
          element.level = training.name
          element.organisation = training.organisation.name
        }
      })
    });
   }
}
