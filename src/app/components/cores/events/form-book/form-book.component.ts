
import {Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FDivelog } from 'src/app/models/forms/divelog.form';
import { DivelogHttpService } from 'src/app/services/http/divelog.http.service';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss'],
})
export class FormBookComponent implements OnInit{

  private _id :any
  get Id(): any { return this._id; }

  private _url :any
  private _urlSegements : any
  get UrlSegements(): any { return this._urlSegements[0].path; }

  private formDivelog: FormGroup = FDivelog();
  get FormDivelog(): FormGroup { return this.formDivelog; }
  get Description():any {return this.formDivelog.get('description');}
  get Duration():any {return this.formDivelog.get('duration');}
  get MaxDeep():any {return this.formDivelog.get('maxDeep');}
  get AirTemperature():any {return this.formDivelog.get('airTemperature');}
  get WaterTemperature():any {return this.formDivelog.get('waterTemperature');}
  get Errors():any{return this.formDivelog.errors}

  private _user! : any
  get User(): any { return this._user; }

  private _divelog : any 
  get Divelog(): any  { return this._divelog; }

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _divelogHttpService : DivelogHttpService,
    private _eventHttpService : EventHttpService,
    private _router : Router,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this._id = (params['id']);
    });
    this.route.url.subscribe(segments => {
      this._urlSegements = segments
      this._url = segments.join('/');
      //console.log("L'URL a changé :", this._url);

      this.getUser()

      if (this._id && segments.length > 0 && segments[0].path === "update-book") {
        this.getDiveLogById(this._id)
      }
    });
 }
 private getUser(){
   this._session.$user.subscribe({
    next : (data :any) =>{
      this._user = data
      if(this._user.id){

      }
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getDiveLogById(id : any){
  this._divelogHttpService.getById(id).subscribe({
    next : (data :any) =>{
      this._divelog = data
      if(this._divelog.id){
        this.addToForm()
      }
      // console.log(this._divelog)
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }


 private addToForm(){

  let form = {
    id : this._divelog.id,
    description : this._divelog.description,
    duration : this._divelog.duration,
    maxDeep : this._divelog.maxDeep,
    airTemperature : this._divelog.airTemperature ? this._divelog.airTemperature : 0,
    waterTemperature : this._divelog.waterTemperature ? this._divelog.waterTemperature : 0,
    eventId : this._id,
    userId : this._user.id
  }
  this.formDivelog.patchValue(form);
}

 send() {
  this.formDivelog.value.eventId = this._id
  this.formDivelog.value.userId = this._user.id

  if (this.formDivelog.valid) {

    if(this._id && this._urlSegements.length > 0 && this._urlSegements[0].path === "update-book"){
      // console.log('update')
      this._divelogHttpService.update(this.formDivelog.value).subscribe({
        next: (data: any) => {
          this._divelog = data
          this._router.navigate(['my-book'])
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
   
    if(this._id && this._urlSegements.length > 0 && this._urlSegements[0].path === "insert-book"){
      // console.log('insert')
      delete this.formDivelog.value.id
      this._divelogHttpService.insert(this.formDivelog.value).subscribe({
        next: (data: any) => {
          this._divelog = data
          this._router.navigate(['my-book'])
        },
        error: (error) => {
          console.log(error);
        }
      });
      }
    }
  }

  
}