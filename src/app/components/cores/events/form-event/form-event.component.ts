import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FEvent } from 'src/app/models/forms/event.form';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { SiteHttpService } from 'src/app/services/http/site.http.service';
import { TrainingHttpService } from 'src/app/services/http/training.http.service';
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


  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _eventHttpService : EventHttpService,
    private _siteHttpService : SiteHttpService,
    private _traininghttpService : TrainingHttpService,
    private _clubHtppService : ClubHttpService,
    private _router : Router,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this._id = (params['id']);
    });
    this.getUser()
    console.log(this._id)
    if(this._id){
      this.getEventById(this._id)
    }
 }
 private getUser(){
   this._session.$user.subscribe({
    next : (data :any) =>{
      this._user = data
      console.log(this._user)
      if(this._user.id){
        this.getAllDiveplace(this._user.id)
        this.getAllTraining()
        this.getAllClub()
      }
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getEventById(id : any){
  this._eventHttpService.getEventById(id).subscribe({
    next : (data :any) =>{
      this._event = data
      if(this._event.id){
        this.addToForm()
      }
      console.log(this._event)
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getAllDiveplace(id :any){
  this._siteHttpService.getAllSite(id).subscribe({
    next : (data :any) =>{
      this._sites = data
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getAllTraining(){
  this._traininghttpService.getAll().subscribe({
    next : (data :any) =>{
      this._trainings = data
      this._user.organisations.forEach((organisation : any) => {
        this._trainings.forEach((training : any)=> {
          if(organisation.id == training.organisation.id && organisation.level =="Instructor"){
            this._userTrainings.push(training)
          }
        })
      });
      //console.log(this._userTrainings)
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getAllClub(){
  this._clubHtppService.getAll().subscribe({
    next : (data :any) =>{
      this._clubs = data
      this._clubs.forEach((club : any)=>{
        club.participes.forEach((particpe : any) => {
          if(particpe.id == this._user.id){
            this._userClubs.push(club)
          }
        })
      })
      //console.log(this._userClubs)
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private addToForm(){
  let form = {
    id : this._event.id,
    name : this._event.name,
    startdate : this._event.startDate,
    enddate : this._event.endDate,
    diveplaceId : this._event.diveplace.id,
    trainingId : this._event.training ? this._event.training.id : 0,
    clubId : this._event.club ? this._event.club.id : 0,
    creatorId : this._user.id
  }
  this.formEvent.patchValue(form);
}

 update() {
  if (this.formEvent.valid) {
    if(this._id){
      console.log('update')
      this._eventHttpService.update(this.formEvent.value).subscribe({
        next: (data: any) => {
          this._event = data
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
      console.log('insert')
      console.log(this.formEvent.value)
      this._eventHttpService.insert(this.formEvent.value).subscribe({
        next: (data: any) => {
          this._event = data
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
        this.getEventById(this._id)
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }
}
